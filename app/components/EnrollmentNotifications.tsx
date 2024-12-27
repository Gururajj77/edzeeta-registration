"use client"
import { useEffect,  } from 'react';
import { useToast } from "@/hooks/use-toast";
import { userData } from './utils/data';



export function EnrollmentNotifications() {
  const { toast } = useToast();


  useEffect(() => {
    const showNotification = () => {
      // Calculate new random delay each time
      const nextDelay = Math.floor(Math.random() * (6000 - 3000) + 3000);
      const randomIndex = Math.floor(Math.random() * userData.length);
      const enrollment = userData[randomIndex];
      
      toast({
        title: "New Enrollment! 🎉",
        description: `${enrollment.name}  has enrolled into ${enrollment.courseName}. Limited slots left!`,
        duration: 6000,
        className: `
          bg-white 
          border-l-4 
          border-blue-500 
          shadow-lg 
          rounded-lg 
          p-4 
          mb-4 
          transform 
          hover:scale-102 
          transition-all 
          duration-200
          cursor-default
        `,
      });


      
      // Schedule next notification with the new random delay
      setTimeout(showNotification, nextDelay + 6000); // Add duration to ensure previous toast is gone
    };

    // Start first notification after 5 seconds
    const initialTimer = setTimeout(showNotification, 5000);

    return () => clearTimeout(initialTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove dependencies as we don't need them

  return null;
}