export default function Answer({answerText, answerState, onSelectAnswer, selectedAnswer}) {
  const isSelected = answerText === selectedAnswer;

  function handleClick() {
    if (answerState !== '') {
      return; // question already answered
    }
    onSelectAnswer(answerText);
  }

  let cssClass = '';
  if (isSelected) {
    if (answerState === 'answered') {
      cssClass = "selected";
    } else if (answerState === 'correct' || answerState === 'wrong') {
      cssClass = answerState;
    }
  }

  return (
    <li className="answer">
      <button className={cssClass} onClick={handleClick} disabled={answerState !== ''}>{answerText}</button>
    </li>
  );
}