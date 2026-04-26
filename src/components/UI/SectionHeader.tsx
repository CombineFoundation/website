const SectionHeader = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-widest text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-500 text-sm">
          {description}
        </p>
      </div>
  )
}

export default SectionHeader