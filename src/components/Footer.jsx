import { FiArrowUp } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="to-top">
        <FiArrowUp />
      </a>
      <p>Made with ❤️ by Rituraj Verma</p>
      <div className="footer-line" />
    </footer>
  )
}
