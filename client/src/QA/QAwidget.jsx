// Main functinalities imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// JSX imports
import Search from './QAcomponents/Search.jsx';
import QuestionList from './QAcomponents/QuestionList.jsx';
import Helpful from './QAcomponents/Helpful.jsx';
import AddQuestion from './QAcomponents/AddQuestion.jsx';

// Material-UI imports
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '80vw'
  },
  questionsStyle: {
    maxHeight: '50vh',
    overflow: 'scroll'
  }
}));

const QAwidget = ( { currentProduct } ) => {

  // const [questions, setQuestions] = useState(sample.questions);
  const [searchInput, setSearchInput] = useState('');
  const [product, setProduct] = useState('');
  const classes = useStyles();

  let handleSearch = (searchInput) => {
    searchInput.length > 2
      ? setSearchInput(searchInput)
      : setSearchInput('');
  };

  // Bindings
  handleSearch = handleSearch.bind(this);

  return (
    <Box elevation={0} className={classes.root}>

      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography variant='h5'
            style={{
              paddingBottom: 0,
              paddingTop: 4,
              matgin: '10px 0px 0px 10px'
            }}>Question and Answers
          </Typography>
        </Grid>

        <Grid item>
          <Search handleSearch={handleSearch} />
        </Grid>

        <Grid item className={classes.questionsStyle}>
          <Grid container direction='column' spacing={3} style={{
            maxWidth: '97%'
          }}>{currentProduct !== undefined && Object.keys(currentProduct).length !== 0 ?
              <QuestionList
                searchInput={searchInput}
                questions={currentProduct.questionsAnswers.results} />
              : null}
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify='center' alignItems='center' spacing={1}>
        ADD FUNCTIONALITIES TO EXPAND/COLLAPSE QUESTIONS HERE

        <Grid item>
          <AddQuestion
            productID={currentProduct.product_id} />
        </Grid>
      </Grid>

    </Box>


  // <div>
  //   <div>

  //     <div>Question Answers</div>
  //     <Search
  //       handleSearch={handleSearch} />

  //     {currentProduct !== undefined && Object.keys(currentProduct).length !== 0 ?
  //       <QuestionList
  //         searchInput={searchInput}
  //         questions={currentProduct.questionsAnswers.results} />
  //       : console.log('loading Q&A')}

  //     <AddQuestion productID={currentProduct.product_id}/>

  //   </div>
  // </div>

  );
};

export default QAwidget;