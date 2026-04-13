import { HeroSection } from '@/components/sections/Hero'
import { DifferentialsSection } from '@/components/sections/Differentials'
import { ProjectsSection } from '@/components/sections/Projects'
import { SocialProofSection } from '@/components/sections/SocialProof'
import { HowItWorksSection } from '@/components/sections/HowItWorks'
import { FAQSection } from '@/components/sections/FAQ'

const Index = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <DifferentialsSection />
      <ProjectsSection />
      <SocialProofSection />
      <HowItWorksSection />
      <FAQSection />
    </div>
  )
}

export default Index
