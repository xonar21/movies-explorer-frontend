import './AboutProject.css';

function AboutProject() {
  return (
    <div id='aboutProject' className='aboutProject'>
        <h2 className='aboutProject__title mainTitle'>О проекте</h2>
        <div className='aboutProject__block aboutProject__block1'>
            <h3 className='aboutProject__blockTitle'>Дипломный проект включал 5 этапов</h3>
            <p className='aboutProject__blockText'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='aboutProject__block aboutProject__block2'>
            <h3 className='aboutProject__blockTitle'>На выполнение диплома ушло 5 недель</h3>
            <p className='aboutProject__blockText'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className='aboutProject__time aboutProject__timeBack'>1 неделя</div>
        <div className='aboutProject__time aboutProject__timeFront'>4 недели</div>
        <p className='aboutProject__text aboutProject__textBack'>Back-end</p>
        <p className='aboutProject__text aboutProject__textFront'>Front-end</p>
    </div>
  );
}

export default AboutProject; 