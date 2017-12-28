const Temp = ({...props}) => {
  return `${Math.round(props.temp)}${props.showDegrees ? '°' : ''}`
}

Temp.defaultProps = {
  showDegrees: false,
}

export default Temp