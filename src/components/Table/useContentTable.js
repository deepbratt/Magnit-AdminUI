const useContentTable = () =>{

    const editItem = (id) =>{
        console.log('Edit this Item= '+id)
    }
    
    const deleteItem = (id) =>{
      console.log('delete this Item= '+id)
  }

  return {editItem, deleteItem}
}

export default useContentTable