import Hero from '../components/sections/Hero'
import FAQ from '../components/sections/FAQ'
import Categories from '../components/sections/Categories'
// import StoryTeaser from '../components/sections/StoryTeaser'
import TicketStrip2 from '../components/sections/TicketStrip2'
import Escapes from '../components/sections/Escapes'
import PlanJourneyCTA from '../components/sections/PlanJourneyCTA'
import TicketStrip from '../components/sections/TicketStrip'
import HowWePlan from '../components/sections/HowWePlan'
import Waitlist from '../components/sections/Waitlist'
import ClosingCTA from '../components/sections/ClosingCTA'
import PhotoMarquee from '../components/sections/PhotoMarquee'
import JoinWaitlistBanner from '../components/sections/JoinWaitlistBanner'

function HomePage() {
  return (
    <main>
      <Hero />
      {/*<StoryTeaser />*/}
      <Categories />
      {/* <BrandStory /> */}
      <TicketStrip2 />
      <Escapes />
      <PlanJourneyCTA />
      <TicketStrip />
      <HowWePlan />
      <Waitlist />
      <ClosingCTA />
      <PhotoMarquee />
      <FAQ />
      <JoinWaitlistBanner />
    </main>
  )
}

export default HomePage
