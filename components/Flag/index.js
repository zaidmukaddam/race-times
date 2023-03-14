import React from 'react'

const Flag = ({ nation }) => {

  const getCountry = nation => {
    switch(nation) {
      case 'Dutch':
        return 'netherlands.svg'
        break;
      case 'British':
        return 'uk.svg'
        break;
      case 'Finnish':
        return 'finland.svg'
        break;
      case 'Spanish':
        return 'spain.svg'
        break;
      case 'Mexican':
        return 'mexico.svg'
        break;
      case 'Monegasque':
        return 'monaco.svg'
        break;
      case 'French':
        return 'france.svg'
        break;
      case 'German':
        return 'germany.svg'
        break;
      case 'Canadian':
        return 'canada.svg'
        break;
      case 'Japanese':
        return 'japan.svg'
        break;
      case 'Italian':
        return 'italy.svg'
        break;
      case 'Russian':
        return 'russia.svg'
        break;
      case 'Polish':
        return 'poland.svg'
        break;
      case 'Australian':
        return 'australia.svg'
        break;
      case 'Thai':
        return 'thailand.svg'
        break;
      case 'Danish':
        return 'denmark.svg'
        break;
      case 'Chinese':
        return 'china.svg'
        break;
      case 'American':
        return 'america.svg'
        break;
      case 'Indian':
        return 'india.svg'
        break;
      default:
        return 'default.svg'
    }
  }

  return(
    <img title={nation} src={`/static/flags/${getCountry(nation)}`} />
  )
}

export default Flag