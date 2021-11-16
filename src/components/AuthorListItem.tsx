import React from 'react';

import { colors } from '../styles/colors';
import { Author } from '../templates/post';
import styled from '@emotion/styled';

interface AuthorListItemProps {
  tooltip: 'small' | 'large';
  author: Author;
}

export const AuthorListItem: React.FC<AuthorListItemProps> = props => {
  return (
    <AuthorListItemLi className="author-list-item">
      {props.tooltip === 'small' && (
        <AuthorNameTooltip className="author-name-tooltip">{props.author.yamlId}</AuthorNameTooltip>
      )}
    </AuthorListItemLi>
  );
};

const AuthorListItemLi = styled.li`
  position: relative;
  flex-shrink: 0;
  margin: 0;
  padding: 0;

  :hover .author-name-tooltip {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const AuthorNameTooltip = styled.div`
  position: absolute;
  bottom: 105%;
  z-index: 999;
  display: block;
  padding: 2px 8px;
  color: white;
  font-size: 1.2rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
  /* background: var(--darkgrey); */
  background: ${colors.darkgrey};
  border-radius: 3px;
  box-shadow: rgba(39, 44, 49, 0.08) 0 12px 26px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  opacity: 0;
  transition: all 0.35s cubic-bezier(0.4, 0.01, 0.165, 0.99);
  transform: translateY(6px);
  pointer-events: none;

  @media (max-width: 700px) {
    display: none;
  }
`;
