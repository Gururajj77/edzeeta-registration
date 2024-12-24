"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useToast } from "../../hooks/use-toast"

export default function CouponSection() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    message: string
  } | null>(null)
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
            message: "Invalid coupon code."
          })
          return
        }

        const emailDoc = emailSnapshot.docs[0]
        // const emailData = emailDoc.data()

        // if (emailData.usedAt) {
        //   setValidationResult({
        //     isValid: false,
        //     message: "This coupon has expired."
        //   })
        //   return
        // }

        // Mark email as used
        await updateDoc(doc(db, 'emails', emailDoc.id), {
          usedAt: new Date().toISOString()
        })

        setValidationResult({
          isValid: true,
          message: "Coupon applied successfully!"
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
            message: "Invalid coupon code."
          })
          return
        }

        const couponDoc = couponSnapshot.docs[0]
        const couponData = couponDoc.data()
        const currentUses = couponData.currentUses || 0
        const newUses = currentUses + 1

        if (newUses >= couponData.maxUses) {
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
          message: "Coupon applied successfully!"
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
          **Bonuses If You Register Today with Coupon Code**
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