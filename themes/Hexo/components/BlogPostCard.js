import BLOG from '@/blog.config'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Code, Collection, CollectionRow, Equation, NotionRenderer } from 'react-notion-x'
import TagItemMini from './TagItemMini'
import CONFIG_HEXO from '../config_hexo'

const BlogPostCard = ({ post, showSummary }) => {
  const showPreview = CONFIG_HEXO.POST_LIST_PREVIEW && post.blockMap
  return (
    <div className='w-full shadow-xl hover:shadow-2xl border border-gray-100 rounded-xl bg-white dark:bg-gray-800 duration-300'>
       <div key={post.id} className='animate__animated animate__fadeIn flex flex-col-reverse lg:flex-row justify-between duration-300'>

      <div className='lg:p-8 p-4 flex flex-col w-full'>
        <Link href={`${BLOG.PATH}/article/${post.slug}`} passHref>
          <a className={`cursor-pointer font-bold hover:underline text-3xl flex ${showPreview ? 'justify-center' : 'justify-start'} leading-tight text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400`}>
            {post.title}
          </a>
        </Link>

        <div className={`flex mt-2 items-center ${showPreview ? 'justify-center' : 'justify-start'} flex-wrap dark:text-gray-500 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 `}>
          <div>
          <Link href={`/archive#${post?.date?.start_date?.substr(0, 7)}`} passHref>
            <a className='font-light hover:underline cursor-pointer text-sm leading-4 mr-3'>{post.date.start_date}</a>
          </Link>
          </div>
        </div>

        {(!showPreview || showSummary) && <p className='mt-4 mb-24 text-gray-700 dark:text-gray-300 text-sm font-light leading-7'>
          {post.summary}
        </p>}

        {showPreview && post?.blockMap && <div className='overflow-ellipsis truncate'>
          <NotionRenderer
            bodyClassName='max-h-full'
            recordMap={post.blockMap}
            mapPageUrl={mapPageUrl}
            components={{
              equation: Equation,
              code: Code,
              collectionRow: CollectionRow,
              collection: Collection
            }}
          />
        </div> }

        <div className='text-gray-400 justify-between flex'>

          <Link href={`/category/${post.category}`} passHref>
              <a className='cursor-pointer font-light text-sm hover:underline transform'>
                <FontAwesomeIcon icon={faFolder} className='mr-1' />{post.category}
              </a>
            </Link>
            <div className='md:flex-nowrap flex-wrap md:justify-start inline-block'>
              <div> {post.tagItems.map(tag => (<TagItemMini key={tag.name} tag={tag} />))}</div>
            </div>
        </div>

      </div>

      {CONFIG_HEXO.POST_LIST_COVER && post?.page_cover && (
        <Link href={`${BLOG.PATH}/article/${post.slug}`} passHref>
        <a className='w-full relative duration-200 rounded-t-xl lg:rounded-r-xl lg:rounded-t-none cursor-pointer transform overflow-hidden'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <img src={post?.page_cover} alt={post.title} className='h-full object-cover'></img> */}
          <Image className='hover:scale-125 rounded-t-xl lg:rounded-r-xl lg:rounded-t-none transform duration-500' src={post?.page_cover} alt={post.title} layout='fill' objectFit='cover' loading='lazy' />
        </a>
      </Link>
      )}
    </div >
    </div>

  )
}

const mapPageUrl = id => {
  return 'https://www.notion.so/' + id.replace(/-/g, '')
}

export default BlogPostCard
