import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext)
    const  {
        handleChange, 
        type, 
        capacity, 
        price, minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context
    //得到所有種類
    let types = getUnique(rooms, 'type')
    //所有種類前加上全部
    types= ['all', ...types]
    //展開到全部
    types= types.map((item,index) => {
    return <option value={item} key={index}>{item}</option>
    })

    let people= getUnique(rooms, 'capacity')
    people=people.map((item,index) => {
    return <option key={index} value={item}>{item}</option>
    })

    return (
        <section className="filter-container">
           <Title title="search room" />
           <form className="filter-form" >
              {/*select type */}
              <div className="form-group">
                  <label htmlFor="type"> 房型</label>
                  <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                    {types}

                  </select>
              </div>
              {/* end select type */} 
              {/*guests */}
              <div className="form-group">
                  <label htmlFor="capacity"> 人數</label>
                  <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                    {people}

                  </select>
              </div>
              {/* end guests */} 

              {/* room price */}   
              <div className="form-group">
                <label htmlFor="price">房間價格 ${price}</label>
                <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"/>
              </div>

              {/*end room price */}   

              {/* size */}
              <div className="form-group">
                <label htmlFor="size">room size</label>
                <div className="size-inputs">
                  <input 
                    type="number" 
                    name="minSize" 
                    id="size" 
                    value={minSize} 
                    onChange={handleChange} 
                    className="size-input"/> 
                  <input 
                    type="number" 
                    name="maxSize" 
                    id="size" 
                    value={maxSize} 
                    onChange={handleChange} 
                    className="size-input"
                  /> 
                </div>
              </div>
              {/* end of size */}

              {/* extras */}
              <div className="form-group">
                <div className="single-extra">
                  <input 
                    type="checkbox" 
                    name="breakfast" 
                    id="breakfast" 
                    checked={breakfast} 
                    onChange={handleChange} 
                  />
                  <label htmlFor="breakfast">供應早餐</label>
                </div>
              

              <div className="form-group">
                <div className="single-extra">
                  <input 
                    type="checkbox" 
                    name="pets" 
                    id="pets" 
                    checked={pets} 
                    onChange={handleChange} 
                  />
                  <label htmlFor="pets">友善寵物</label>
                </div>
              </div>
              </div>
              {/* end of extras */}
            </form> 
        </section>
    )
}
