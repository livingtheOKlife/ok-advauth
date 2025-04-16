import MainContainer from '../components/layout/MainContainer'

function AboutPage () {
  return (
    <MainContainer page='about-page'>
      <h3>About <span className="logo"><em>OK</em>advauth</span></h3>
      <p><em>MERN authentication using JWT and HTTP-Only cookies</em></p>
      <p>This is a starter app for a MERN stack application with authentication. This is for a SPA (Single Page Application) workflow that uses the Vite Build tool.</p>
      <div className="about">
        <h4>Did you know...</h4>
        <div>
          <p>... in The Hitchhiker&apos;s Guide to the Galaxy, by Douglas Adams, he chose the number 42 for the meaning of life?</p>
          <p>But why? <em>42</em> corresponds to the asterisk (*) symbol in ASCII code. As developers, we use the asterisk to refer to anything, or everything. To me, this means that the supercomputer from the book could not define the meaning of life because the meaning is not singular. Instead, it is simply anything, and everything you want it to be.</p>
          <p>Life is what you make of it. Some search a lifetime to find why they are here, and what they want to do with the time they have. Don&apos;t spend your days searching for your place in the world, because it is probably already right in front of you. In the people you meet, the lives to you touch, and even the work that you do.</p>
        </div>
      </div>
    </MainContainer>
  )
}

export default AboutPage