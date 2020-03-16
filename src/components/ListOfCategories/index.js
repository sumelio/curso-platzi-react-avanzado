import React, { Fragment, useState, useEffect }  from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'

function useCategoriesData () {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    setLoading(true)
    window.fetch('https://7dcf436c-f0b2-4fa3-97ff-25c00ad0c86d.mock.pstmn.io/categories')
      .then(res => res.json())
      .then(response => {
        setCategories(response.categories)
        setLoading(false)
      })
  }, [])

  return { categories, loading }
}


export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData()
  const [showFixed, setShowFixed] = useState(false)

  useEffect(function () {
    window.fetch('https://7dcf436c-f0b2-4fa3-97ff-25c00ad0c86d.mock.pstmn.io/categories')
      .then(res => res.json())
      .then(response => {
        setCategories(response.categories)
      })
  }, [])

  useEffect(function () {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }

    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [showFixed])

  const  renderList = (fixed) => (
    <List fixed={fixed} >
              
      { loading
          ? <Item key='loading'><Category /></Item>
          :
        categories.map(category => <Item key={category}  ><Category {...category} /></Item>)
      }
    </List> 
  )
  return (
    <Fragment>
      {renderList(showFixed)}
    </Fragment>
  )
}