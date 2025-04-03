const OtherArticleCard = ({ title, date, image }) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      {/* Image */}
      <div className="w-full sm:w-1/4">
        <img src={image} alt={title} className="w-full h-48 sm:h-24 rounded-lg object-cover cursor-pointer" />
      </div>
      {/* Text */}
      <div className="w-full sm:w-3/4">
        <h3
          style={{ fontSize: "15px" }}
          className="text-md cursor-pointer hover:text-[#fcb900] mb-2 font-normal text-gray-800"
        >
          {title}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{date}</p>
      </div>
    </div>
  )
}

export default OtherArticleCard

