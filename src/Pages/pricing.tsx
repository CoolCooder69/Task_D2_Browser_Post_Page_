import { useState } from "react";
import axios from "axios";
import Subscription from "@/components/Premium";
import BankPop from "@/components/bankCard";
import { useFirebase } from "@/Context/firebase";
import { useAuth } from "@/Context/AuthContext";
import ErrorPop from "@/components/Errorpop";
export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isPremium } = useFirebase();
  const { user, loading } = useAuth();

  const handleUpgrade = async () => {
    if (loading) return;
    try {
      if (!user) {
        throw new Error("Please log in first");
      }
      const token = await user.getIdToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api/upgrade`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (e) {
      console.log(e);
      ErrorPop({ message: "Something went wrong." });
    }
  };

  return (
    <>
      <div className="my-10 sm:my-20 mx-auto grid max-w-3xl gap-6 px-4 md:grid-cols-2">
        <Subscription
          name="Free"
          price="Free"
          description="Free forever"
          features={[
            "Access to basic posts",
            "5 posts per month",
            "2 MB image uploads",
          ]}
          buttonText={isPremium ? "Free" : "Current Plan"}
          isPaid
        />
        <Subscription
          name="Premium"
          price="₹199"
          description="For users who want more"
          features={[
            "Access to all posts",
            "50 posts per month",
            "10 MB image uploads",
          ]}
          buttonText={isPremium ? "Current Plan" : "Upgrade Plan"}
          onUpgrade={() => !isPremium && setModalOpen(true)}
        />
      </div>

      <BankPop
        open={modalOpen}
        onOpenChange={setModalOpen}
        onUpgrade={handleUpgrade}
      />
    </>
  );
}