"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Sparkles, ArrowRight, Loader2, Clock } from 'lucide-react'
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useToast } from "../../hooks/use-toast"

type ValidationResult = {
  isValid: boolean
  message: string
  expiryDate?: Timestamp
}

function TimeRemaining({ expiryDate }: { expiryDate: Timestamp }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = expiryDate.toDate();
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, expired: false };
    };

    // Update every second instead of every minute
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft()); // Initial calculation

    return () => clearInterval(timer);
  }, [expiryDate]);

  if (timeLeft.expired) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 animate-pulse">
        <div className="flex items-center justify-center space-x-2 text-red-600">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Coupon Expired</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <div className="text-center text-blue-800 font-medium mb-2">
        Time Remaining to Use Coupon
      </div>
      <div className="flex justify-center items-center space-x-4">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-lg p-3 shadow-sm min-w-[60px]">
              <span className="text-2xl font-bold text-blue-600">{timeLeft.days}</span>
            </div>
            <span className="text-sm text-blue-600 mt-1">Days</span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-lg p-3 shadow-sm min-w-[60px]">
            <span className="text-2xl font-bold text-blue-600">
              {timeLeft.days > 0 ? timeLeft.hours : timeLeft.hours.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-sm text-blue-600 mt-1">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-lg p-3 shadow-sm min-w-[60px]">
            <span className="text-2xl font-bold text-blue-600">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-sm text-blue-600 mt-1">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-lg p-3 shadow-sm min-w-[60px]">
            <span className="text-2xl font-bold text-blue-600">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-sm text-blue-600 mt-1">Seconds</span>
        </div>
      </div>
      <div className="text-center text-sm text-blue-600 mt-3 font-medium animate-pulse">
        Use your discount before it expires!
      </div>
    </div>
  );
}

export default function CouponSection() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const { toast } = useToast()

  const validateInput = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email or coupon code",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Check if input is an email
      const isEmail = input.includes('@')

      if (isEmail) {
        // Check email-based one-time coupons
        const emailQuery = query(
          collection(db, 'emails'),
          where('email', '==', input.toLowerCase()),
          where('isActive', '==', true)
        )
        
        const emailSnapshot = await getDocs(emailQuery)
        
        if (emailSnapshot.empty) {
          setValidationResult({
            isValid: false,
            message: "Invalid email or coupon"
          })
          return
        }

        const emailDoc = emailSnapshot.docs[0]
        const emailData = emailDoc.data()

        // Check expiry
        if (emailData.expiryDate && emailData.expiryDate.toDate() < new Date()) {
          setValidationResult({
            isValid: false,
            message: "This coupon has expired"
          })
          return
        }

        // Mark email as used
        await updateDoc(doc(db, 'emails', emailDoc.id), {
          usedAt: new Date().toISOString()
        })

        setValidationResult({
          isValid: true,
          message: "Coupon applied successfully!",
          expiryDate: emailData.expiryDate
        })

      } else {
        // Check general coupons
        const couponQuery = query(
          collection(db, 'coupons'),
          where('code', '==', input),
          where('isActive', '==', true)
        )
        
        const couponSnapshot = await getDocs(couponQuery)
        
        if (couponSnapshot.empty) {
          setValidationResult({
            isValid: false,
            message: "Invalid coupon code"
          })
          return
        }

        const couponDoc = couponSnapshot.docs[0]
        const couponData = couponDoc.data()

        // Check expiry
        if (couponData.expiryDate && couponData.expiryDate.toDate() < new Date()) {
          setValidationResult({
            isValid: false,
            message: "This coupon has expired"
          })
          return
        }

        const currentUses = couponData.currentUses || 0
        const maxUses = couponData.maxUses

        if (maxUses && currentUses >= maxUses) {
          setValidationResult({
            isValid: false,
            message: "This coupon has reached its usage limit"
          })
          return
        }

        const newUses = currentUses + 1

        if (maxUses && newUses >= maxUses) {
          // Delete coupon if max uses reached
          await deleteDoc(doc(db, 'coupons', couponDoc.id))
        } else {
          // Update uses count
          await updateDoc(doc(db, 'coupons', couponDoc.id), {
            currentUses: newUses
          })
        }

        setValidationResult({
          isValid: true,
          message: "Coupon applied successfully!",
          expiryDate: couponData.expiryDate
        })
      }
      
    } catch (error) {
      console.error('Error validating:', error)
      toast({
        title: "Error",
        description: "Failed to validate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const finalPrice = validationResult?.isValid ? 1000 : 2000

  const linkChanger = () => {
    if (validationResult?.isValid) {
      window.open('https://forms.eduqfix.com/fiscf/add', '_blank')
    } else {
      window.open('https://forms.eduqfix.com/fiiopf/add', '_blank')
    }
  }

  return (
    <div id="coupon-section" className="w-full max-w-3xl mx-auto mt-12 sm:mt-16 lg:mt-24 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
          Add Coupon Code
        </h2>
        <div className="w-24 h-1 bg-[#1e3fac] mx-auto mb-6"></div>
        <p className="text-lg sm:text-xl text-gray-700 font-semibold">
          **Special Discount with Coupon Code**
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="text-3xl font-bold text-[#1e3fac]">
          Rs. {finalPrice}
          {validationResult?.isValid && (
            <span className="ml-2 text-lg line-through text-gray-500">
              Rs. 2000
            </span>
          )}
        </div>
        {validationResult?.isValid && (
          <p className="text-green-600 mt-2 font-medium">
            50% discount applied!
          </p>
        )}
      </div>

      <Card className="shadow-lg">
        <CardContent className="space-y-6 p-6">
          <form onSubmit={validateInput} className="space-y-4">
            <Input
              placeholder="Enter email or coupon code"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full text-lg py-6 bg-gray-50 focus:bg-white transition-colors duration-300"
              disabled={loading}
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-[#1e3fac] hover:bg-[#162c7c] text-lg py-6 transition-all duration-300 
                       flex items-center justify-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>APPLY</span>
                </>
              )}
            </Button>
          </form>

          {validationResult && (
            <div className="space-y-2">
              <div
                className={`p-4 rounded-lg ${
                  validationResult.isValid ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                } flex items-center justify-center space-x-2 text-lg`}
              >
                {validationResult.isValid ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <span>{validationResult.message}</span>
              </div>
              
              {validationResult.isValid && validationResult.expiryDate && (
                <TimeRemaining expiryDate={validationResult.expiryDate} />
              )}
            </div>
          )}

          <Button
            onClick={linkChanger} 
            className="w-full bg-[#1e3fac] hover:bg-[#162c7c] text-lg py-6 transition-all duration-300 
                     flex items-center justify-center space-x-2"
          >
            <span>PROCEED TO PAYMENT</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}