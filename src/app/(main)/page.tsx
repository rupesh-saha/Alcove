import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import NewsletterFAQ from "@/components/NewsletterFAQ";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero/>
      <HowItWorks/>
      <Testimonials/>
      <NewsletterFAQ/>
    </div>
  );
}
