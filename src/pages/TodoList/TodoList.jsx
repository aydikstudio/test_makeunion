import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Checkbox, FormControl, Input, InputLabel, TextField } from '@mui/material';

function TodoList() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');


  useEffect(() => {
    getData();
  }, [])



  const getData = async () => {
    await axios({
      method: 'get',
      url: process.env.REACT_APP_LINK
    })
      .then(function (response) {
        let new_arr = response.data.map((item) => {
          item.isAdmin = false
          return (
            item
          )
        })
        sortId(new_arr)
      });
  }

  const onAdd = () => {



    if (name.length > 0 && phone.length > 0 && email.length > 0 && description.length > 0 && image.length > 0) {

      let new_list= [...list]
  
      new_list.push({
        name: name,
        avatar: image,
        description: description,
        email: email,
        phone: phone,
        id: (new_list.length+1).toString()
      })

      sortId(new_list)

      setName('')
      setPhone('')
      setEmail('')
      setDescription('')
      setImage('')
    } else {
      alert("Заполните все поля")
    }
  }


  const handleToggle = (id, isAdmin) => {
    let new_arr = [...list].map((item) => {
      if(item.id == id) {
        item.isAdmin = isAdmin
      }
      return item
    })

    setList(new_arr)
  }


  function sortId(arr) {
    setList(arr.sort(function (a, b) {
      return  b.id - a.id;
    }))
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>

      <div>
        <FormControl sx={{ 'marginTop': 2 }}>


          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />

        </FormControl>

      </div>
      <div>
        <FormControl sx={{ 'marginTop': 2 }}>
          <InputLabel htmlFor="img">Image</InputLabel>
          <Input id="img" value={image} onChange={(e) => setImage(e.target.value)} />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ 'marginTop': 2 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
      </div>

      <div>
        <FormControl sx={{ 'marginTop': 2 }}>
          <InputLabel htmlFor="phone">Phone</InputLabel>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>
      </div>


      <div>
        <FormControl sx={{ 'marginTop': 2 }}>

          <TextField id="description" placeholder='description' onChange={(e) => setDescription(e.target.value)} value={description} />
        </FormControl>
      </div>


      <div>
        <Button onClick={onAdd} sx={{ 'marginTop': 2 }}>Добавить</Button>
      </div>

      <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {list.length > 0 ? list.map((item) => {

          return (
          <div>
              <ListItem
                key={item.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={() => handleToggle(item.id, !item.isAdmin)}
                    checked={item.isAdmin}
                    inputProps={ item.id }
                  />
                }
                disablePadding
              >
                  <Link to={`user/` + item.id} state={{ user: item }}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt={item.id}
                      src={item.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText id={item.id} primary={item.id+" "+item.name + ": " + item.email} />
                </ListItemButton>
                </Link>
              </ListItem>
      </div>
          );
        }) : 'Loading...'}
      </List>
    </div>
  );
}

export default TodoList;
