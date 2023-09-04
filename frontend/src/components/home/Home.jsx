import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Post from '../posts/Post';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Sun, Moon } from 'react-bootstrap-icons';







const Home = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [allPosts, setAllPosts] = useState([]);


    const handleDeletePost = (postId) => {
        setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    };


    const handleUpdatePost = (updatedPost) => {
        setAllPosts((prevPosts) => {
            const index = prevPosts.findIndex((post) => post._id === updatedPost._id);

            const newPosts = [...prevPosts];
            newPosts[index] = updatedPost;

            return newPosts;
        })

    }

    const instance = axios.create({
        baseURL: "https://react-crud.cyclic.app"

    })




    async function retriveData() {

        try {
            const response = await instance.get(`/posts`)
            console.log(response.data)
            setAllPosts(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createPost = async (e) => {
        e.preventDefault();

        const newTitle = e.target[0].value;
        const newText = e.target[1].value;

        setTitle(newTitle)
        setText(newText)

        console.log(e.target[0].value)
        console.log(e.target[1].value)

        const response = await instance.post(`/post`, {
            title: newTitle,
            text: newText

        })

        try {
            console.log(response.data)

            retriveData();
        } catch (error) {
            console.log(error.data)
        }


    }


    useEffect(() => {
        retriveData();

    }, []);


    



    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container className='d-flex justify-content-center'>
                    <h1 className='text-center bg-success  p-3 text-light rounded '>POSTING APP</h1>
                </Container>
            </Navbar>


            <div className='d-flex justify-content-center'>
                <Form className='m-4 p-3  bg-success-subtle w-75  ' onSubmit={createPost}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className='display-6 fw-bold'>Title:</Form.Label>
                        <Form.Control type="text" required placeholder="abc123" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className='display-6 fw-bold'>Post Content</Form.Label>
                        <Form.Control as="textarea" rows={3} required placeholder='some text.....' />
                    </Form.Group>
                    <Button type='submit' variant="primary">Post</Button>
                </Form>
            </div>

            {allPosts.map((eachPost, index) => {
                return <Post key={index} eachPost={eachPost} onDelete={handleDeletePost} onUpdate={handleUpdatePost} />
            })}


        </>




    )

}

export default Home;