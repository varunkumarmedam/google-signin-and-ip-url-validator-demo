export default function GlitchTitleText({ text }) {
  return <div class="glitch">
    <span aria-hidden="true">{text}</span>
    {text}
    <span aria-hidden="true">{text}</span>
  </div>
}