import BLOG from '@/blog.config'
import { useEffect } from 'react'
const Cusdis = ({ id, url, title }) => {
  useEffect(() => {
    const script = document.createElement('script')
    const anchor = document.getElementById('comments')
    script.setAttribute(
      'src',
      BLOG.COMMENT_CUSDIS_SCRIPT_SRC
    )
    script.setAttribute('async', true)
    script.setAttribute('defer', true)
    anchor.appendChild(script)
    return () => {
      anchor.innerHTML = ''
    }
  })
  return (
    <div id="comments">
      <div
        id="cusdis_thread"
        data-host={BLOG.COMMENT_CUSDIS_HOST}
        data-app-id={BLOG.COMMENT_CUSDIS_APP_ID}
        data-page-id={id}
        data-page-url={url}
        data-page-title={title}
      />
    </div>
  )
}

export default Cusdis
