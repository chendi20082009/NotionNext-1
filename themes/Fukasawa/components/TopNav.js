import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Collapse from './Collapse'
import GroupMenu from './GroupMenu'
import Logo from './Logo'

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const TopNav = ({ tags, currentTag, categories, currentCategory, postCount }) => {
  const [isOpen, changeShow] = useState(false)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  return (<div id='top-nav' className='z-40 block lg:hidden'>

    {/* 导航栏 */}
    <div id='sticky-nav' className={'lg:relative w-full top-0 z-20 transform duration-500'}>
      <Collapse isOpen={isOpen}>
        <div className='bg-white py-1 px-5'>
          <GroupMenu/>
          </div>
      </Collapse>
      <div className='w-full flex justify-between items-center p-4 bg-white'>
        {/* 左侧LOGO 标题 */}
        <div className='flex flex-none flex-grow-0'>
        <Logo/>

        </div>

        <div className='flex'>
        </div>

        {/* 右侧功能 */}
        <div className='mr-1 flex justify-end items-center text-sm space-x-4 font-serif dark:text-gray-200'>
          <div onClick={toggleMenuOpen} className='w-18 cursor-pointer'>
           菜单 { isOpen ? <FontAwesomeIcon icon={faTimes} size={'lg'}/> : <FontAwesomeIcon icon={faBars} size={'lg'}/> }
            </div>
        </div>
      </div>
    </div>

  </div>)
}

export default TopNav
