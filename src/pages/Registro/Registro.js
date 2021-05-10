import React, { useEffect } from 'react'
import './Registro.css'
import Icon from './img/Icon.png'
import { Route, Link } from 'react-router-dom'
import Input from '../../components/input/input'
import Aos from "aos"
import 'aos/dist/aos.css'

export default props => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])



    return (
        <>

            <div data-aos="slide-right" className="split leftR">

            <div className="centered">
                <div data-aos="zoom-in-up" className="imgBox">
                            <img src={Icon}></img>
                </div>
                <div className="Anato">
                    <h1 >Cupido Online</h1>
                </div>
            </div>

            </div>
            <div className="split rightR">
                <div className="centered">
                    <div className="box">
                        

                        <form data-aos="fade-right">

                            <div className="InputBox">
                                <Input label="Nome"></Input>
                            </div>
                            <div className="InputBox">
                                <Input label="Email"></Input>
                            </div>


                            <div className="InputBox">
                                <Input type="password" label="Senha"></Input>
                            </div>

                            <div className="ButtonBox">
                            <Link to="/home"><input type="submit" value="Entrar"></input></Link><br></br>
                                <Link to="/" >
                                    <button className="link">Já possuo conta</button>
                                </Link>
                            </div>

                        </form>

                    </div>

                </div>
            </div>






        </>

    )

}