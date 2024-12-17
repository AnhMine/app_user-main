import React, { useEffect, useState } from "react";
import "./Comment.css";
import axios from "axios";

interface sendCommentDTO {
  rating: number;
  content: string;
  productId: number;
  detailProductId: number;
  accountId: number;
}

interface CommentDTO {
  id: number;
  rating: number;
  content: string;
  timeCreated: string;
  productId: number;
  accountId: number;
  account: {
    id: number;
    userName: string;
    image: string;
  };
  detailProduct: {
    id: number;
    size: string;
    gender: string;
  };
}

interface RepoDTO {
    items: CommentDTO[]
    hisMore: boolean
}
const Comment = (props: {
  productId: number;
  productDetailId: number | undefined;
}) => {
  
  const [rating, setRating] = useState(0); // Lưu số sao được chọn
  const [isComment, setIsComment] = useState(false);

  const session = sessionStorage.getItem("user");
  const accountId = session ? JSON.parse(session).accountId : null;
  const [sendComment, setSendComment] = useState<sendCommentDTO>({
    rating: 5,
    content: "",
    productId: props.productId,
    detailProductId: props?.productDetailId as number,
    accountId: accountId,
  });
  const [comment, setComment] = useState<CommentDTO[]>([]);
  const [hisMore, setHisMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const handleStarClick = (value: number) => {
    setRating(value);
    setSendComment({ ...sendComment, rating: value });
  };

  useEffect(() => {
    setRating(5);
    loadCheckIsComment();
    loadComment(1);
  }, [props.productDetailId]);

  const loadCheckIsComment = async () => {
    const data = {
      accountId: accountId,
      productId: props.productId,
      detailProductId: props.productDetailId,
    };
    const response = await axios.post(
      `https://localhost:7048/api/Comment/check-is-comment`,
      data
    );
    if (response) {
      setIsComment(response.data);
    }
  };

  const loadComment = async (newPageNumber: number) => {
    const response = await axios.get(
      `https://localhost:7048/api/Comment/get_comment-by-productid/${props.productId}`,
      {
        params: {
          pageNumber: newPageNumber,
        },
      }
    );
    if (response) {
      setComment(response.data.items);
      setHisMore(response.data.hisMore);
    }
  };

  const handleNextPage = () => {
    const newpageNumber = pageNumber + 1;
    setPageNumber(newpageNumber);
    loadComment(newpageNumber);
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSendComment({ ...sendComment, content: value });
    
  };

  const handleSubmit = async () => {
    const data : sendCommentDTO = {
      rating: sendComment.rating,
      content: sendComment.content,
      productId: props.productId,
      detailProductId: props.productDetailId as number,
      accountId: accountId,
    }
    
    const response = await axios.post(
      `https://localhost:7048/api/Comment/add-comment-inproduct`,
      data
    );
    if (response) {
      setIsComment(false);
      loadComment(pageNumber);
    }
  };

  return (
    <>
      <section>
        {isComment ? (
          <>
            <div className="comment-user-text-respond">
              <div className="dlex-danhgia-sao-click">
                <h3 className="h3-header-danhgia">Đánh giá</h3>
                <div className="cite-text-name-danhgia-1">
                  <span className="stars-rating">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <i
                        key={index}
                        className={`ri-star-fill ${
                          index <= rating ? "selected" : ""
                        }`}
                        onClick={() => handleStarClick(index)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    ))}
                  </span>
                </div>
              </div>
              <div className="div-p-comment-user-danhgia">
                <label htmlFor="comment" className="label-comment-user-danhgia">
                  Bình luận
                </label>
                <textarea
                  id="comment"
                  className="textarea-comment-user-danhgia"
                  onChange={onChange}
                ></textarea>
              </div>
              <div>
                <input
                  type="text"
                  name="submit"
                  className="input-comment-user-danhgia"
                  id="submit"
                  placeholder="Bình luận"
                  onClick={handleSubmit}
                ></input>
              </div>
            </div>
            
          </>
        ) : null}
        <div>
              <h3 className="h3-header-danhgia">Đánh giá</h3>
            </div>
        <ul className="ul-list-danhgia">
          {comment.map((item, index) => (
            <li className="li-item-danhgia">
              <div className="art-item-danhgia">
                <div className="d-flex-item-danhgia">
                  <div className="d-flex-flex-col-img">
                    <img
                      src="/src/image/av.jpg"
                      className="img-flex-avata-user-danhgia"
                    ></img>
                  </div>
                  <div className="d-flex-col-text-danhgia">
                    <div className="cite-text-name-danhgia">
                      {item?.account?.userName}
                      <span className="stars-rating">
                        {
                          [...Array(item?.rating)].map((star, index) => (
                            <i
                              key={index}
                              className="ri-star-fill selected"
                            ></i>
                          ))
                        }
                      </span>
                    </div>
                    <p className="comment-text-danhgia">{item?.content}</p>
                    <div className="date-text-danhgia">
                    {new Date(item?.timeCreated).toLocaleString('vi-VN', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })} | {item?.detailProduct.size} | {item?.detailProduct.gender}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div>
            {hisMore && (
                <div className="text-center">
                <button type="button" className="btn btn-primary"
                  onClick={handleNextPage}>
                  Xem thêm
                </button>
              </div>
            )}
          
        </div>
      </section>
    </>
  );
};

export default Comment;
