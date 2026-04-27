const SectionHeader = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold tracking-widest text-gray-950 mb-3 uppercase">
        {title}
      </h2>
      <p className="text-gray-950 text-base font-normal">
        {description}
      </p>
    </div>
  )
}

export default SectionHeader