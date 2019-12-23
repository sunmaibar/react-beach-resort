import React, { Component } from 'react'
//import items from './data'
import Client from './Contentful'

const RoomContext = React.createContext()

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice:0,
        macPrice:0,
        minSize:0,
        maxSize:0,
        breakfast: false,
        pets: false
    }
    // getData
    getData = async () => {
        try {
            let response = await Client.getEntries ({
                content_type: 'beachResortRoomExample',
                order: 'fields.price'
            })
            let rooms = this.formatData(response.items)
            let featuredRooms = rooms.filter(room=> room.featured === true)
            let maxPrice = Math.max(...rooms.map(item => item.price))
            let maxSize = Math.max(...rooms.map(item => item.size))

        this.setState({
            rooms,
            featuredRooms, 
            sortedRooms: rooms, 
            loading:false,
            price: maxPrice,
            maxPrice,
            maxSize
        })

        }catch (error) {
            console.log(error)
        }
    }
    // this.Data
    componentDidMount(){
        this.getData()
    }

    formatData(items){
        let tempItems= items.map(item=> {
            let id= item.sys.id
            let images=item.fields.images.map(image =>image.fields.file.url)

            let room= { ...item.fields, images, id}
            return room
        })
        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]
        const room = tempRooms.find((room)=> room.slug === slug)
        return room
    }
    handleChange = event => {
        const target = event.target
        const value = target.type ==='checkbox' ? target.checked:target.value
        const name = event.target.name
        this.setState({
            [name]:value
        },
            this.filterRooms)
    }
    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize,maxSize,breakfast,pets
        } = this.state
        //所有房間
        let tempRooms = [...rooms]

        //轉換值  把字串轉為數字
        capacity= parseInt(capacity)
        price= parseInt(price)

        //依種類篩選
        if(type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        //依人數篩選
        if(capacity !== 1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //依價格篩選
        tempRooms = tempRooms.filter(room => room.price <= price)
        //依大小篩選
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
        //依早餐篩選
        if(breakfast) {
            tempRooms=tempRooms.filter(room => room.breakfast===true)
        }
        //依寵物篩選
        if(pets) {
            tempRooms=tempRooms.filter(room => room.pets===true)
        }


        //change state
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer

export {RoomProvider, RoomConsumer, RoomContext}