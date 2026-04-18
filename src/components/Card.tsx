type CardProps = {
  name1: string
  name2: string
  image1: string
  image2: string
  onClickImage1: () => void
  onClickImage2: () => void
}

export default function Card({
  name1,
  name2,
  image1,
  image2,
  onClickImage1,
  onClickImage2,
}: CardProps) {
  return (
    <>
      <div className="bg-black min-w-0">
        <img
          src={`/${image1}.jpg`}
          alt=""
          className="cursor-pointer w-full h-auto max-h-[min(55vh,520px)] md:max-h-none object-cover object-top block"
          onClick={onClickImage1}
        />
        <h2 className="text-center mx-2 my-2 sm:m-3 text-lg sm:text-2xl text-white font-semibold wrap-break-word">
          {name1}
        </h2>
      </div>
      <div className="min-w-0">
        <img
          src={`/${image2}.jpg`}
          alt=""
          className="cursor-pointer w-full h-auto max-h-[min(55vh,520px)] md:max-h-none object-cover object-top block"
          onClick={onClickImage2}
        />
        <h2 className="text-center mx-2 my-2 sm:m-3 text-lg sm:text-2xl font-semibold wrap-break-word">
          {name2}
        </h2>
      </div>
    </>
  )
}
