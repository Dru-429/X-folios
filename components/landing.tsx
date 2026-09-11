"use client"

import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import portfolios from '@/data/portfolios.json'
import Link from 'next/link'

type Portfolio = {
  'sl.no.': number
  Username: string
  'X url': string
  'X image url': string
  'portfolio url': string
}

const records = portfolios as Portfolio[]
const PAGE_SIZE = 20
const previewThemes = [
  'preview-warm',
  'preview-ink',
  'preview-blue',
  'preview-rose',
  'preview-moss'
]

export default function Landing () {
  const [page, setPage] = useState(1)
  const [isDark, setIsDark] = useState(false)
  const pageCount = Math.ceil(records.length / PAGE_SIZE)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('x-folios-theme')
    const dark = savedTheme === 'dark'
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  const currentRecords = useMemo(
    () => records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page]
  )

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    window.localStorage.setItem('x-folios-theme', next ? 'dark' : 'light')
  }

  const changePage = (nextPage: number) => {
    setPage(Math.min(pageCount, Math.max(1, nextPage)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <header className='border-b border-border'>
        <div className='mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10'>
          <Link
            href='/'
            className='font-display text-xl font-medium tracking-tight text-foreground'
          >
            <span className='text-primary'>x</span> folios
          </Link>
          <nav
            className='hidden items-center gap-7 text-sm text-muted-foreground sm:flex'
            aria-label='Primary navigation'
          >
            <Link
              href='#folios'
              className='transition-colors hover:text-foreground'
            >
              folios
            </Link>
            <Link
              href='https://x.com'
              target='_blank'
              rel='noreferrer'
              className='transition-colors hover:text-foreground'
            >
              X ↗
            </Link>
          </nav>
          <Button
            variant='outline'
            size='icon'
            onClick={toggleTheme}
            aria-label={
              isDark ? 'Switch to light mode' : 'Switch to night mode'
            }
            className='border-border bg-card text-foreground shadow-none hover:bg-accent hover:text-accent-foreground'
          >
            {isDark ? <Sun aria-hidden='true' /> : <Moon aria-hidden='true' />}
          </Button>
        </div>
      </header>

      <main
        id='folios'
        className='mx-auto max-w-[1440px] px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20'
      >
        <section className='mb-12 flex flex-col justify-between gap-8 border-b border-border pb-10 sm:flex-row sm:items-end'>
          <div className='max-w-2xl'>
            <p className='mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-primary'>
              A living index / 2026
            </p>
            <h1 className='font-display text-5xl font-normal leading-[0.96] tracking-[-0.06em] sm:text-7xl'>
              Portfolios from <span className='text-primary'>X.</span>
            </h1>
            <p className='mt-6 max-w-lg text-base leading-relaxed text-muted-foreground'>
              A small collection of personal corners on the internet, made by
              developers and designers who share their work on X.
            </p>
          </div>
          <div className='flex items-end gap-3 text-right'>
            <div>
              <p className='font-display text-4xl tracking-[-0.05em]'>
                {records.length}
              </p>
              <p className='font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground'>
                folios collected
              </p>
            </div>
          </div>
        </section>

        <div className='mb-5 flex items-center justify-between gap-4'>
          <p className='font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground'>
            Showing {String((page - 1) * PAGE_SIZE + 1).padStart(3, '0')} —{' '}
            {String(Math.min(page * PAGE_SIZE, records.length)).padStart(
              3,
              '0'
            )}
          </p>
          <p className='text-sm text-muted-foreground'>
            Page {page} of {pageCount}
          </p>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={page}
            className='portfolio-grid'
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {currentRecords.map((portfolio, index) => (
              <PortfolioTile
                key={portfolio['sl.no.']}
                portfolio={portfolio}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className='mt-12 flex items-center justify-between border-t border-border pt-5'>
          <Button
            variant='ghost'
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className='px-0 text-muted-foreground hover:bg-transparent hover:text-foreground'
          >
            <ChevronLeft aria-hidden='true' /> Previous
          </Button>
          <div className='flex items-center gap-1' aria-label='Pagination'>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              item => (
                <Button
                  key={item}
                  variant={item === page ? 'default' : 'ghost'}
                  size='icon'
                  onClick={() => changePage(item)}
                  aria-label={`Go to page ${item}`}
                  aria-current={item === page ? 'page' : undefined}
                  className={
                    item === page ? 'h-8 w-8' : 'h-8 w-8 text-muted-foreground'
                  }
                >
                  {item}
                </Button>
              )
            )}
          </div>
          <Button
            variant='ghost'
            onClick={() => changePage(page + 1)}
            disabled={page === pageCount}
            className='px-0 text-muted-foreground hover:bg-transparent hover:text-foreground'
          >
            Next <ChevronRight aria-hidden='true' />
          </Button>
        </div>
      </main>

      <footer className='border-t border-border'>
        <div className='mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10'>
          <p>Made for the curious internet.</p>
          <p className='font-mono'>x folios / open index</p>
        </div>
      </footer>
    </div>
  )
}

function PortfolioTile ({
  portfolio,
  index
}: {
  portfolio: Portfolio
  index: number
}) {
  const [rawName, handle] = portfolio.Username.split(' - ')
  const name = rawName ?? portfolio.Username
  const domain = portfolio['portfolio url']
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace(/\/$/, '')
  const initials = name.trim().slice(0, 2).toUpperCase()

  return (
    <motion.article
      className='group min-w-0 overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-primary/60'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.025, 0.3), duration: 0.35 }}
    >
      <a
        href={portfolio['portfolio url']}
        target='_blank'
        rel='noreferrer'
        className='block'
        aria-label={`Open ${name}'s portfolio`}
      >
        <div
          className={`relative aspect-[1.48] overflow-hidden border-b border-border ${
            previewThemes[index % previewThemes.length]
          }`}
        >
          <div className='absolute inset-x-[9%] top-[13%] bottom-[12%] overflow-hidden rounded-[4px] border border-foreground/15 bg-card/80 p-[7%] transition-transform duration-500 group-hover:scale-[1.025]'>
            <div className='mb-[10%] flex items-center justify-between'>
              <span className='h-1 w-[26%] rounded-full bg-foreground/60' />
              <span className='h-1 w-[14%] rounded-full bg-primary/70' />
            </div>
            <div className='h-[8%] w-[68%] rounded-full bg-foreground/70' />
            <div className='mt-[5%] h-[5%] w-[48%] rounded-full bg-foreground/20' />
            <div className='mt-[16%] grid grid-cols-3 gap-[5%]'>
              <span className='aspect-[1.4] rounded-[2px] bg-primary/35' />
              <span className='aspect-[1.4] rounded-[2px] bg-foreground/10' />
              <span className='aspect-[1.4] rounded-[2px] bg-foreground/10' />
            </div>
            <span className='absolute bottom-[10%] left-[7%] h-1 w-[24%] rounded-full bg-foreground/25' />
          </div>
          <span className='absolute right-[9%] top-[8%] font-mono text-[8px] text-foreground/60'>
            {String(portfolio['sl.no.']).padStart(3, '0')}
          </span>
          <span className='absolute bottom-[7%] left-[9%] font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/50'>
            view site ↗
          </span>
        </div>
        <div className='flex min-w-0 items-center gap-3 p-3 sm:p-4'>
          <Avatar className='h-9 w-9 shrink-0 rounded-md border border-border'>
            <AvatarImage
              src={portfolio['X image url']}
              alt={`${name} on X`}
              loading='lazy'
            />
            <AvatarFallback className='rounded-md bg-accent text-xs text-accent-foreground'>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium text-card-foreground'>
              {name}
            </p>
            <p className='truncate text-xs text-muted-foreground'>
              {handle ?? `@${name.toLowerCase().replaceAll(' ', '')}`}
            </p>
          </div>
          <ArrowUpRight
            className='h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary'
            aria-hidden='true'
          />
        </div>
      </a>
      <div className='truncate border-t border-border/70 px-3 pb-3 font-mono text-[10px] text-muted-foreground sm:px-4'>
        {domain}
      </div>
    </motion.article>
  )
}
