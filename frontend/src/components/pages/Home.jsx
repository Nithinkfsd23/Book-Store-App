import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import BG1 from '../../utils//images/BG1.jpeg'
const Home = () => {


    return (

        <div>

            <div style={{ backgroundImage: `url(${BG1})`, backgroundSize: "cover", height: "100vh" }}>
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>
                </div>

                 {/* navbar */}
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">BOOK STORE APP</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>

                            </ul>
                            <form class="d-flex" >

                                <Link to='/login'>
                                    <Button style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}
                                    >   LOGIN
                                    </Button>
                                </Link>

                                <Link to='/signup'>
                                    <Button style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}>
                                        SIGNUP
                                    </Button>
                                </Link>

                            </form>
                        </div>
                    </div>
                </nav>

                {/* Centered content about books */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: 'white',
                    }}
                >
                    <h1>Welcome to our Book Store</h1>
                    <p>Discover a world of books and reading adventures.</p>
                    {/* You can add more content here */}
                </div>


            </div>
        </div>



    )
}

export default Home