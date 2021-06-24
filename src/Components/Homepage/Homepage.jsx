import React from 'react'
import headerBand from '../../Assets/Images/headerBand.png';
import img1 from '../../Assets/Images/img1.png';
import img2 from '../../Assets/Images/img2.png';
import img3 from '../../Assets/Images/img3.png';
import img4 from '../../Assets/Images/img4.png';
import rbVideo from '../../Assets/Videos/rbVideo.webm'
import footer from '../../Assets/Images/footer.png';


const Homepage = ({ searchVisible }) => {
    console.log(searchVisible, "home")
    return (
        <div className="homepage-wrapper">
            <div>
                <img src={headerBand} />
            </div>
            <div>
                <video src={rbVideo} autoPlay loop />
            </div>
            <div>
                <img src={img1} />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img3} />
            </div>
            <div>
                <img src={img4} />
            </div>
            <div>
                <img src={footer} />
            </div>
        </div>
    );
}

export default Homepage;