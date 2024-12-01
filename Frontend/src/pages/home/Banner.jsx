
import bannerImg from '../../assets/banner.png'

export const Banner = () => {
  return (
    <div className=' flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>

        {/* Right side Banner */}    
        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="Banner" />
        </div>

        {/* Left side Banner */}
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
            <p className='mb-10'>It&apos;s time to update your reading list with some of the latest and greatest
                releases in the literary world. From heart-pumping thrillers to captivating memoirs,
                this week&apos;s new releases are sure to keep you turning pages late into the night.
            </p>
            <button className='btn-primary'>Subcribe</button>
        </div>

    </div>
  )
}
