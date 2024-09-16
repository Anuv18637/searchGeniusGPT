import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Import arrow icon
import { CollapsibleMessage } from './collapsible-messages';

// Define the Message and ChatMessagesProps types
interface Message {
  id: string;
  title?: string;
  generatedAnswer?: string;
  followUpQuestions?: string[];
  images?: string[];
  component?: React.ReactNode;
  isCollapsed?: boolean;
  response?: string;
}

interface ChatMessagesProps {
  messages: Message; 
  selectedTile: string | null;
  onhandleFollowUp?:(data:any) =>void
}

// Styled components for image container and item
const ImageContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '20px',
  maxHeight: '300px',
  overflowY: 'auto',
});

const ImageItem = styled('img')({
  height: '100px',
  objectFit: 'cover',
});

// Styled AccordionDetails for scrolling content
const StyledAccordionDetails = styled(AccordionDetails)({
  maxHeight: '450px', 
  overflowY: 'auto', 
});

// Custom styled AccordionSummary
const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: 'var(--background-color)', 
  color: 'white', 
  flexDirection: 'row', 
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: 'white',
    order: 1, 
    marginLeft: 'auto',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '16px',
  },
});

// Styled link and icon for follow-up questions
const FollowUpLink = styled('li')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '5px',
  cursor: 'pointer',
  listStyle: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const FollowUpIcon = styled(ArrowForwardIcon)({
  marginRight: '8px',
  color: 'white', 
  width:'15px'
});

export function ChatMessages({ messages, selectedTile, onhandleFollowUp }: ChatMessagesProps) {
  // Initialize state for controlling the accordion expanded state
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    // Set the accordion expanded state based on message changes
    setExpanded(true);
  }, [messages]);

  // Handle changing the expanded state
  const handleChange = (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded);
  };

  // Function to handle API requests and update the message
  const handleFollowUpClick = async (messageId: string, question: string) => {
    setExpanded(false);
    let json = { role: 'user', content: question };
    if (onhandleFollowUp) {
      onhandleFollowUp(json);
    }
  };

  const cleanTitle = messages.title ? messages.title.replace(/^Results for Query:\s*/, '').replace(/^"(.+)"$/, '$1') : '';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <div style={{ width: '100%', maxWidth: '900px', height: '100%' }}>
        {selectedTile === 'internet' ? (
          <Accordion
            expanded={expanded}
            onChange={handleChange}
            style={{ marginTop: '15px', background: 'rgb(38, 38, 38)', color: 'white' }}
          >
            <StyledAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-content`}
              id={`panel-header`}
            >
              <Typography variant="h6" fontWeight="bold" fontSize={18}>
                {cleanTitle && cleanTitle}
              </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              {messages.generatedAnswer && (
                <>
                 <Typography variant="h6" fontWeight="bold" gutterBottom>
                 Response
               </Typography>
                <Typography variant="body1" paragraph>
                  {messages.generatedAnswer}
                </Typography>
                </>
              )}
              {messages.followUpQuestions && messages.followUpQuestions.length > 0 && (
                <>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Follow-Up Questions:
                  </Typography>
                  <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                    {messages.followUpQuestions.map((question, i) => (
                      <FollowUpLink
                        key={i}
                        onClick={() => handleFollowUpClick(messages.id, question)}
                      >
                        <FollowUpIcon />
                        {question}
                      </FollowUpLink>
                    ))}
                  </ul>
                </>
              )}
              {messages.images && messages.images.length > 0 && (
                <ImageContainer>
                  {messages.images.map((image, i) => (
                    <ImageItem
                      key={i}
                      src={image}
                      alt={`Visual representation ${i}`}
                    />
                  ))}
                </ImageContainer>
              )}
            </StyledAccordionDetails>
          </Accordion>
        ) : (
          <CollapsibleMessage
            key={messages.id}
            message={{
              id: messages.id,
              component: messages.component ? [messages.component] : [],
              isCollapsed: messages.isCollapsed
            }}
            isLastMessage={true}
          />
        )}
      </div>
    </div>
  );
}
