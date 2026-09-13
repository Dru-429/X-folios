const Hero = ({ num }: { num: number }) => {
  return (
    <section
      id='hero'
      className='mb-12 w-full min-h-[80vh] flex justify-between items-center gap-8 border-b border-border pb-10 sm:flex-row sm:items-end'
    >
      <div className='max-w-2xl'>
        <p className='mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary'>
          A living index / 2026
        </p>
        <h1 className='font-display text-5xl font-normal leading-[0.96] tracking-[-0.06em] sm:text-7xl'>
          Portfolios from <span className='text-primary'>X.</span>
        </h1>
        <p className='mt-6 max-w-lg text-base leading-relaxed text-muted-foreground'>
          <span className='text-primary/80'>Chess.com for landing pages. </span>{' '}
          Elo based Landing pages ranking.
        </p>
        <p className='mt-6 max-w-lg text-base leading-relaxed text-muted-foreground'>
          A small collection of personal corners on the internet, made by
          developers and designers who share their work on X.
        </p>
      </div>
      <div className='flex items-between gap-3 text-right'>
        <div>
          <p className='font-display text-4xl tracking-[-0.05em]'>{num}</p>
          <p className='font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
            folios collected
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
