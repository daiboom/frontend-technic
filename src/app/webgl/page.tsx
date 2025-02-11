'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const ITEMS_PER_PAGE = 6

function WebGLGalleryContent() {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('webgl-page')) || 1

  const projects = [
    {
      href: '/webgl/pheonix',
      title: '불사조',
      description: '화려한 파티클 효과를 활용한 불사조 애니메이션',
    },
    {
      href: '/webgl/music-sphere',
      title: '음악상자',
      description: '3D 공간에서 음악과 시각적 요소를 결합한 인터랙티브 작품',
    },
    {
      href: '/webgl/solar-system',
      title: '태양계',
      description: '실제 태양계의 크기와 움직임을 시뮬레이션한 작품',
    },
    {
      href: '/webgl/suika-game',
      title: '수박 만들기',
      description: '물리 엔진을 활용한 수박 게임 모작',
    },
    {
      href: '/webgl/explosion',
      title: '3D 빅뱅 애니메이션',
      description: '빅뱅 애니메이션 만들기',
    },
    {
      href: '/webgl/circles',
      title: '2D 서클들',
      description: '하나의 궤도에 여러 서클 만들기',
    },
    {
      href: '/webgl/star-topology',
      title: '성형 토폴로지',
      description: '성형 토폴로지 만들기',
    },
  ]

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const currentProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-8">
        {currentProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b text-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-black">WebGL 갤러리</h1>
        <p className="text-black leading-relaxed mb-12 max-w-3xl">
          회사 업무와 개인적인 WebGL 모작 프로젝트들을 한곳에 모아둔
          갤러리입니다...
        </p>
        <Suspense fallback={<div>로딩중...</div>}>
          <WebGLGalleryContent />
        </Suspense>
      </div>
    </main>
  )
}

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  return (
    <div className="flex justify-center gap-2">
      <Link
        href={`?webgl-page=${Math.max(1, currentPage - 1)}`}
        className={`px-4 py-2 bg-black text-white rounded-lg ${
          currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        이전
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`?webgl-page=${page}`}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`?webgl_page=${Math.min(totalPages, currentPage + 1)}`}
        className={`px-4 py-2 bg-black text-white rounded-lg ${
          currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        다음
      </Link>
    </div>
  )
}

function ProjectCard({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-lg bg-black hover:bg-neutral-950
                 transform hover:-translate-y-1 transition-all duration-300
                 border border-gray-700 hover:border-gray-600"
    >
      <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>
      <p className="text-white text-sm">{description}</p>
    </Link>
  )
}
