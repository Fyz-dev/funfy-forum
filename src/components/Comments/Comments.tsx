import { FC } from 'react';
import Comment from 'src/components/Comment';
import { IComments } from 'src/interface';

const Comments: FC<{ comments: IComments }> = ({ comments }) => {
  const getComments = (comments: IComments) => {
    return comments.map(comment => (
      <Comment key={comment.id} comment={comment}>
        {getComments(comment.childComment ?? [])}
      </Comment>
    ));
  };

  return getComments(comments);
};

export default Comments;
