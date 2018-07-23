import * as React from 'react';

interface IProps {
  compiler: string,
  framework: string,
  bundler: string
}

export class Layout extends React.Component<IProps, {}> {
  render() {
    return( 
      <div>
        <h1>
          This is a {this.props.framework} application using {this.props.compiler} with {this.props.bundler}
        </h1>
      </div>
    )
  }
}