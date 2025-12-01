const Loading = ({className="h-[calc(90vh-4rem)] flex items-center justify-center"}) => {
  return (
    <div className={className}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  )
}

export default Loading
