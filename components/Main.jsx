import React from 'react'
import "./Main.css"
import Chart from "./Chart";
import { GoGraph } from "react-icons/go";


const Main = () => {
    return (
        <main>
            <div className='main'>
                <div className='maintitle'>
                    <div className='maingreeting'>
                        <h1>Welcome to eLocalhood Seller Dashboard</h1>
                        <p>Your Business Our Priority</p>
                    </div>
                </div>

                <div className='maincards'>
                    <div className="card">

                        <div className='cardinner'>
                            <p className='products'>Products</p>
                            <span>574</span>
                        </div>
                    </div>

                    <div className="card">
                        <div className='cardinner'>
                            <p className='orders'> Number of Orders done</p>
                            <span>211</span>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='cardinner'>
                            <p className='Total'>Total Revenue</p>
                            <span>2,50,000</span>
                        </div>
                    </div>

                    <div className='card'>
                        <div className='cardinner'>
                            <p className='sold'>Number of Products sold</p>
                            <span>5000</span>
                        </div>
                    </div>

                    <div className='charts'>
                        <div className='chartsleft'>
                            <div className='chartslefttitle'>
                                <div>
                                    <h1>Daily Reports</h1>
                                    <p>Pune,Maharashtra</p>
                                </div>
                                <GoGraph className="graphicon" />
                            </div>
                            <Chart />
                        </div>

                        {/* <div className='chartsright'>
    <div className='chartsrighttitle'>
        <div >

        </div>
    </div>
</div> */}

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main;
