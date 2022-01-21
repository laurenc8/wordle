import GridRow from './GridRow';

function GridLayout({guesses}) {
  return (
    <div>
      <GridRow letters = {guesses[0]}/>
      <GridRow letters = {guesses[1]}/>
      <GridRow letters = {guesses[2]}/>
      <GridRow letters = {guesses[3]}/>
      <GridRow letters = {guesses[4]}/>
      <GridRow letters = {guesses[5]}/>
    </div>
  );
}

export default GridLayout;