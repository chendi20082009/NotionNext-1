import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config'
import LayoutBase from './LayoutBase'
import StickyBar from './components/StickyBar'
import CategoryList from './components/CategoryList'
import BlogPostListScroll from './components/BlogPostListScroll'

export const LayoutCategory = ({ tags, posts, category, categories, latestPosts, postCount }) => {
  const { locale } = useGlobal()
  const meta = {
    title: `${category} | ${locale.COMMON.CATEGORY} | ${BLOG.TITLE}`,
    description: BLOG.DESCRIPTION,
    type: 'website'
  }
  return <LayoutBase meta={meta} tags={tags} currentCategory={category} postCount={postCount} latestPosts={latestPosts} categories={categories}>
    <StickyBar>
      <CategoryList currentCategory={category} categories={categories} />
    </StickyBar>
    <div className='md:mt-8'>
      <BlogPostListScroll posts={posts} tags={tags} currentCategory={category}/>
    </div>
  </LayoutBase>
}
