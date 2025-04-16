import { FaRegCopyright } from 'react-icons/fa6'

function FooterContainer () {
  return (
    <footer id="footer-container">
      <div id="footer-wrapper">
        <div id="brand">
          <span id="logo">livingthe<em>OK</em>life</span>
          <FaRegCopyright className="copyright" />
          <span className="copyright">2025</span>
        </div>
        <span className="right">All rights reserved.</span>
      </div>
    </footer>
  )
}

export default FooterContainer