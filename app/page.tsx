import HeroSection from '@/components/home/HeroSection'
import PopularDestinations from '@/components/home/PopularDestinations'
import FeaturedPackages from '@/components/home/FeaturedPackages'

export default function Home() {
  return (
    <>
      <HeroSection />
      <PopularDestinations />
      <FeaturedPackages />
    </>
  )
}