import BLOG from '@/blog.config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

/**
 * 数字翻页插件
 * @param page 当前页码
 * @param showNext 是否有下一页
 * @returns {JSX.Element}
 * @constructor
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const currentPage = +page
  const showNext = page !== totalPage
  const pages = generatePages(page, currentPage, totalPage)

  return (
    <div className='my-5 flex justify-center items-end font-medium text-black duration-500 bg-white dark:bg-blue-700 dark:text-gray-300 py-3 space-x-2'>

      {/* 上一页 */}
      <Link
        href={ {
          pathname: (currentPage - 1 === 1 ? `${BLOG.PATH || '/'}` : `/page/${currentPage - 1}`), query: router.query.s ? { s: router.query.s } : {}
        } } passHref >
        <div
          rel='prev'
          className={`${currentPage === 1 ? 'invisible' : 'block'} border-white dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-400 w-6 text-center cursor-pointer duration-200  hover:font-bold`}
        >
          <FontAwesomeIcon icon={faAngleLeft}/>
        </div>
      </Link>

      {pages}

      {/* 下一页 */}
      <Link href={ { pathname: `/page/${currentPage + 1}`, query: router.query.s ? { s: router.query.s } : {} } } passHref>
        <div
          rel='next'
          className={`${+showNext ? 'block' : 'invisible'} border-t-2 border-white dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-400 w-6 text-center cursor-pointer duration-500  hover:font-bold`}
        >
          <FontAwesomeIcon icon={faAngleRight}/>
        </div>
      </Link>
    </div>
  )
}

function getPageElement (page, currentPage) {
  return <Link href={page === 1 ? '/' : `/page/${page}`} key={page} passHref>
      <a className={(page + '' === currentPage + '' ? 'font-bold bg-blue-500 dark:bg-blue-400 text-white ' : 'border-t-2 duration-500 border-white hover:border-blue-400 ') +
      ' border-white dark:border-blue-700 dark:hover:border-blue-400 cursor-pointer w-6 text-center font-light hover:font-bold'}>
      {page}
      </a>
    </Link>
}
function generatePages (page, currentPage, totalPage) {
  const pages = []
  const groupCount = 7 // 最多显示页签数
  if (totalPage <= groupCount) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(getPageElement(i, page))
    }
  } else {
    pages.push(getPageElement(1, page))
    const dynamicGroupCount = groupCount - 2
    let startPage = currentPage - 2
    if (startPage <= 1) {
      startPage = 2
    }
    if (startPage + dynamicGroupCount > totalPage) {
      startPage = totalPage - dynamicGroupCount
    }
    if (startPage > 2) {
      pages.push(<div key={-1}>... </div>)
    }

    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(startPage + i, page))
      }
    }

    if (startPage + dynamicGroupCount < totalPage) {
      pages.push(<div key={-2}>... </div>)
    }

    pages.push(getPageElement(totalPage, page))
  }
  return pages
}
export default PaginationNumber
