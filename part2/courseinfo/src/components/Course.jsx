const Course = (prop) => {
    const course = prop.course.map((course) => {
      return (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
    })
  
    return (
      <>
        {course}
      </>
    )
  }
  
  const Header = (prop) => {
    return (
      <h2>{prop.course}</h2>
    )
  }
  
  const Content = (prop) => {
    const arr = prop.parts.map(course => <Part key={course.id} part={course.name} exercises={course.exercises} />)
  
    return (
      <>
        {arr}
      </>
    )
  }
  
  const Part = (prop) => {
    return (
      <p>{prop.part} {prop.exercises}</p>
    )
  }
  
  const Total = (prop) => {
    const sum = prop.parts
      .map(course => course.exercises)
      .reduce((prevVal, currentValue) => prevVal + currentValue);
  
    return (
      <h3>total of exercises {sum}</h3>
    )
  }

export default Course