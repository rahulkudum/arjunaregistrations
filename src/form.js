import React, { useEffect, useState } from "react";
import "./form.css";
import iseminar from "./images/arjuna_logo.png";
import iceo from "./images/ceo.png";
import iceo1 from "./images/ceo1.JPG";
import ilogo from "./images/arjunalogowithmotto.jpg";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Carousel from "react-material-ui-carousel";

import { Facebook, Mail, YouTube } from "@material-ui/icons";

function Form(props) {
 let { webinarId } = useParams();

 let { path } = useRouteMatch();
 const [webinar, setWebinar] = useState({});
 const [name, setName] = useState("");
 const [number, setNumber] = useState();
 const [dob, setDob] = useState("");
 const [email, setEmail] = useState("");
 const [gender, setGender] = useState("");
 const [role, setRole] = useState("");
 const [newStudent, setNewStudent] = useState("");
 const [done, setDone] = useState(false);
 const [id, setId] = useState("");

 const [part, setPart] = useState({ email: "", gender: "", role: "", dob: "" });

 useEffect(() => {
  axios
   .post("https://arjunadb.herokuapp.com/webinar/find", { webinarid: webinarId })
   .then((res) => {
    axios
     .post("https://arjunadb.herokuapp.com/pwebinar/find", { webinarid: res.data.webinarid })
     .then((res2) => {
      res.data.pwebinar = res2.data;
      setWebinar(res.data);
     })
     .catch((err) => console.log(err));
   })
   .catch((err) => console.log(err));
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission

  Array.prototype.slice.call(forms).forEach(function (form) {
   form.addEventListener(
    "submit",
    function (event) {
     if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
     }

     form.classList.add("was-validated");
    },
    false
   );
  });
 }, []);

 return (
  <Switch>
   <Route exact path={path}>
    <div className="dbody">
     <header>
      <div className="header-row1">
       <img src={iseminar} className="brand-logo" alt="Arjuna Logo" />
       <div>
        <Mail style={{ fontSize: "60px", margin: "20px" }} />
        <Facebook style={{ fontSize: "60px", color: "blue", margin: "20px" }} />
        <YouTube style={{ fontSize: "60px", color: "red", margin: "20px" }} />
       </div>
      </div>
     </header>
     <section className="coverpage-sec">
      {/* <img src="./images/seminar.jpg" className="coverpage-img" alt="" /> */}
      <div className="coverpage-sec__preacher-webinar-det">
       <div className="coverpage-sec__ambassador-img">
        <img src={iceo} alt="" />
       </div>
       <div className="coverpage-sec__webinar-det">
        <h1 className="coverpage-sec__webinar-det__series-name">Parivartan Series</h1>
        <h2 className="coverpage-sec__webinar-det__title">{webinar.pwebinar ? webinar.pwebinar.name : "webinar"}</h2>
        <h3 className="coverpage-sec__webinar-det__sub-title">A Student's opportunity to build resilience</h3>
        <h3 className="coverpage-sec__webinar-det__preacher-name">By Amal M Das</h3>
       </div>
      </div>

      <div className="coverpage-sec__reg-div">
       {!done ? (
        <>
         {!newStudent ? (
          <form
           noValidate
           className="coverpage-sec__reg-form needs-validation 1"
           onSubmit={(e) => {
            e.preventDefault();

            axios
             .post("https://arjunadb.herokuapp.com/user/find", { number: Number(number) })
             .then((res) => {
              if (res.data) {
               axios
                .post("https://arjunadb.herokuapp.com/user/webinaradd", {
                 id: res.data._id,
                 webinarid: webinar._id,
                })
                .then((res) => {
                 if (!res.data) alert("You have already registered for this webinar");
                 if (res.data.email === "" || res.data.dob === "" || res.data.role === "" || res.data.gender === "") {
                  setId(res.data._id);
                  setEmail(res.data.email);
                  setDob(res.data.dob);
                  setGender(res.data.gender);
                  setRole(res.data.role);
                  part.email = res.data.email;
                  part.gender = res.data.gender;
                  part.role = res.data.role;
                  part.dob = res.data.dob;
                  setNewStudent("part");
                 } else {
                  setDone(true);
                 }
                })
                .catch((err) => console.log(err));
              } else setNewStudent("new");
             })
             .catch((err) => console.log(err));
           }}
          >
           <h2>Register Now</h2>
           <div>
            <label for="name">Name</label>
            <input type="text" name="name" value={name} required id="defaultFormRegisterNameEx" onChange={(e) => setName(e.target.value)} />
            <div className="invalid-feedback">Name should not be empty</div>
           </div>

           <div>
            <label for="phone">Phone Number</label>
            <input
             type="text"
             name="phone"
             value={number}
             pattern="^[0-9]{10}$"
             required
             id="defaultFormRegisterNumberEx"
             onChange={(e) => setNumber(e.target.value)}
            />
            <div className="invalid-feedback">Phone Number is not valid!</div>
           </div>

           <button id="form-submit" submit>
            Submit
           </button>
          </form>
         ) : (
          <form
           noValidate
           className="coverpage-sec__reg-form needs-validation 2"
           onSubmit={(e) => {
            e.preventDefault();

            if (newStudent === "new") {
             axios
              .post("https://arjunadb.herokuapp.com/user/add", {
               name: name,
               number: number,
               email: email,
               dob: dob,
               gender: gender,
               role: role,
               webinarid: webinar._id,
              })
              .then((res) => {
               console.log(res.data);
               setDone(true);
              })

              .catch((err) => console.log(err));
            } else if (newStudent === "part") {
             axios
              .post("https://arjunadb.herokuapp.com/user/updateadd", {
               id: id,
               email: email,
               dob: dob,
               gender: gender,
               role: role,
               webinarid: webinar._id,
              })
              .then((res) => {
               console.log(res.data);
               setDone(true);
              })

              .catch((err) => console.log(err));
            }
           }}
          >
           <div>
            {newStudent === "new" ? <p>Looks like this is your first ARJUNA webinar!</p> : <p>Looks like some of your details are missing</p>}
            <p>By filling out the below details, you can receive updates about our events</p>
           </div>

           {newStudent === "new" || (newStudent === "part" && part.email === "") ? (
            <div style={{ width: "90%", marginBottom: "10px" }}>
             <label for="email" style={{ display: "block" }}>
              E-mail
             </label>
             <input type="email" name="email" id="defaultFormRegisterEmailEx" value={email} required onChange={(e) => setEmail(e.target.value)} />

             <div className="invalid-feedback">Email is not valid!</div>
            </div>
           ) : null}

           {newStudent === "new" || (newStudent === "part" && part.gender === "") ? (
            <div style={{ width: "90%", margin: "10px" }}>
             <select
              className="form-select"
              style={{ width: "95%" }}
              id="inputGroupSelect01"
              onChange={(e) => {
               setGender(e.target.value);
              }}
             >
              <option value="" disabled selected hidden>
               Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
             </select>
            </div>
           ) : null}

           {newStudent === "new" || (newStudent === "part" && part.role === "") ? (
            <div style={{ width: "90%", margin: "10px" }}>
             <select
              className="form-select"
              style={{ width: "95%" }}
              id="inputGroupSelect01"
              onChange={(e) => {
               setRole(e.target.value);
              }}
             >
              <option value="" disabled selected hidden>
               Role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="working professional">Working Professional</option>
             </select>
            </div>
           ) : null}

           {newStudent === "new" || (newStudent === "part" && part.dob === "") ? (
            <div style={{ width: "90%" }}>
             <label for="dob" style={{ display: "block" }}>
              Date of Birth
             </label>
             <input
              type="text"
              name="dob"
              placeholder="dd/mm/yyyy"
              value={dob}
              id="defaultFormRegisterdobEx"
              pattern="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$"
              onChange={(e) => setDob(e.target.value)}
             />
             <div className="invalid-feedback">Valid format for Date of Birth: dd/mm/yyyy</div>
             <br />
            </div>
           ) : null}
           <button id="form-submit" submit>
            Submit
           </button>
          </form>
         )}
        </>
       ) : (
        <form action="" className="coverpage-sec__reg-form">
         <div>
          <h2 style={{ textAlign: "center" }}>Thank You</h2>
          <p style={{ maxWidth: "400px" }}>We hope that you will take maximum benifit from our webinars and fly with colours in every aspect of our life</p>
         </div>
         <a href="https://www.studentthinkbox.com/" class="btn-sample-pink">
          Website
         </a>
         <a
          href={`https://calendar.google.com/calendar/r/eventedit?text=testing+event&dates=20211208T170000/20211208T200000&details=chant+and+be+happy&location=Zoom`}
          className="btn-sample-blue"
         >
          Calendar
         </a>
         <Carousel>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=1vWZGzKlt8M">
            <img src="https://img.youtube.com/vi/1vWZGzKlt8M/0.jpg" />
           </a>
          </div>

          <div className="crop">
           <a href="https://www.youtube.com/watch?v=OKUYNoex6Ag">
            <img src="https://img.youtube.com/vi/OKUYNoex6Ag/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=QHfD72Z9-uA">
            <img src="https://img.youtube.com/vi/QHfD72Z9-uA/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=V7Ftxz-ytcE">
            <img src="https://img.youtube.com/vi/V7Ftxz-ytcE/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=c_1lo50AVVU">
            <img src="https://img.youtube.com/vi/c_1lo50AVVU/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=wcmiFAvITtU">
            <img src="https://img.youtube.com/vi/wcmiFAvITtU/0.jpg" />
           </a>
          </div>

          <div className="crop">
           <a href="https://www.youtube.com/watch?v=EvLTYvj0Vto">
            <img src="https://img.youtube.com/vi/EvLTYvj0Vto/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=nNnFg92mmGo">
            <img src="https://img.youtube.com/vi/nNnFg92mmGo/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=jQidcUBKGBI">
            <img src="https://img.youtube.com/vi/jQidcUBKGBI/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=1SKWtBH7s8M">
            <img src="https://img.youtube.com/vi/1SKWtBH7s8M/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=Ghkx3ZP07Uc">
            <img src="https://img.youtube.com/vi/Ghkx3ZP07Uc/0.jpg" />
           </a>
          </div>
          <div className="crop">
           <a href="https://www.youtube.com/watch?v=6qBa_0SSdN4">
            <img src="https://img.youtube.com/vi/6qBa_0SSdN4/0.jpg" />
           </a>
          </div>
         </Carousel>
        </form>
       )}
      </div>
     </section>

     <section className="key-learnings-sec">
      <div className="key-learnings-sec__det">
       <h1 className="key-learnings-sec__heading">Key Learnings</h1>
       {/* <h3 className="key-learnings-sec__sub-heading">from this webinar</h3> */}

       <ul>
        <li>Convert Failures into Life-changing Opportunities.</li>
        <li>Improve Focus and Concentration power.</li>
        <li>Learn Authentic and Ethical Living.</li>
        <li>Explore Leadership Qualities by taking ownership.</li>
        <li>Goal Setting with Success roadmap design.</li>
       </ul>
      </div>
      <div className="key-learnings-sec__img-div">
       <img src={`https://res.cloudinary.com/arjunadb/image/upload/webinar_posters/${webinarId}`} alt="books image" className="key-learnings-sec__img" />
      </div>
     </section>

     <section className="ceo-sec">
      <div className="ceo-sec__det">
       <h2 className="ceo-sec__sub-heading">Who is</h2>
       <h1 className="ceo-sec__heading">Amal M Das?</h1>

       <ul>
        <li>Bestselling Author of books like "The Art of Concentration", "Time Management for students", and "Parenting Teenagers for wholesome success"</li>
        <li>Motivational speaker, invited to top institutes like IIT BHU, IIT K, IIT M, IIT Indore, IIIT Vadodara</li>
        <li>Influenced over 3 Lakh senior secondary students in India overe 12 years</li>
        <li>Founder and CEO of ARJUNA Group Trust</li>
       </ul>
      </div>
      <div className="ceo-sec__img-div">
       {/* <img src="./images/mandala_ceo.png" alt="" className="ceo-sec__mandala-img" /> */}
       <img src={iceo1} alt="" className="ceo-sec__ceo-img" />
      </div>
     </section>

     <section className="about-sec">
      <div className="about-sec__head-div">
       <h2 className="about-sec__sub-heading">About</h2>
       <h1 className="about-sec__heading">Arjuna Group Trust</h1>
      </div>
      <div className="about-sec__body-div">
       <div className="about-sec__body-div__det">
        <ul>
         <li>World's Greatest Influencers, International Motivational Speaker, Leadership Consultant & Business Coach.</li>
         <li>Owner of World’s No #1 Most Subscribed Entrepreneurship YouTube Channel with more than 16.2 million Subscribers</li>
         <li>Learn Authentic and Ethical Living.</li>
         <li>Explore Leadership Qualities by taking ownership.</li>
         <li>Goal Setting with Success roadmap design.</li>
        </ul>
       </div>
       <div className="about-sec__body-div__img-div">
        <img src={ilogo} alt="" className="about-sec__body-div__about-img" />
       </div>
      </div>
     </section>

     <section></section>
     <footer>
      <p>© ARJUNA Group Trust 2021. All Rights Reserved.</p>

      {/* <nav>
     <p>About</p>
     <p>Terms and Conditions</p>
     <p>Contact</p>
    </nav> */}
     </footer>
    </div>
   </Route>
  </Switch>
 );
}

export default Form;
