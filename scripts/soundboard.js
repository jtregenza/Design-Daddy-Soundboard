
class Board extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				audio: {
					sound: null,
					soundName: null,
					currentlyPlaying: null 
				}
			}
		}
		
		playSound(id) {
			if (this.state.audio.currentlyPlaying) {
				let snd = this.state.audio.sound;
				snd.pause();
			}
			let sound = this.props.sounds.find(sound => { return sound.id === id});
			let snd = new Audio(sound.soundURL);
			this.setState({ audio: { sound: snd, soundName: sound.soundName, currentlyPlaying: true }});
			snd.play();
			
			let data = [...this.props.sounds];
			const index = data.findIndex(obj => obj.soundName === sound.soundName);
			data[index].count += 1;
			data[index].isPlaying = true;
			this.setState(data);
			
			snd.addEventListener('ended', this.soundListener.bind(this, data, index, snd));
		}
		
		soundListener(data, index, snd) {
			const newData = [ ...data ];
			newData[index].isPlaying = false;
			this.setState(newData);
			snd.removeEventListener('ended', this.soundListener);
		} 
		
		renderSounds() {
			return this.props.sounds.map(sound => {
				return <Sound key={sound.id} sound={sound} audio={this.state.audio} playSound={this.playSound.bind(this)} />
			})
		}
		render() {
			return (
				<div className="appContainer">
					{this.renderSounds()}
				</div>
			)
		}
	};
	
	class Sound extends React.Component {
		render() {
			let speakerStyle = 'play_circle_outline';
			if (this.props.sound.isPlaying && this.props.sound.soundName === this.props.audio.soundName && this.props.audio.currentlyPlaying) {
				speakerStyle = 'pause_circle_outline';
			}
			let recordAni ='record';
			if (this.props.sound.isPlaying) {
				recordAni += ' spin';
			}

			let soundCount = this.props.sound.count;


			return (
				<div className='sound-card'
					onClick={() => this.props.playSound(this.props.sound.id)}>
					<div className="sound-content">
						<h3>{this.props.sound.soundName}</h3>
						<div className="sound-actions">
							<div className="image-container">
								<i className='material-icons' aria-hidden="true">{speakerStyle}</i>
							</div>
							{soundCount < 99 &&
								<div className="count">{this.props.sound.count}</div>
							
							}
							{soundCount > 99 &&
								<div className="count">!</div>
							}
						</div>
						<div className="record-container">
							<img className={recordAni} src="/img/record-icon.svg"/>
						</div>
					</div>
				</div>
			);
		}
	}
	

	class App extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				sounds: [
					{ id: 1, soundName: 'How you livin', soundURL: 'https://dl.dropboxusercontent.com/s/351qi1jsmsg7h8e/How%20you%20Livin.m4a', count: 0, isPlaying: false }, 
					{ id: 2, soundName: 'Fuck it up', soundURL: 'https://dl.dropboxusercontent.com/s/4tyf7uruyf6rbsq/Fuck%20it%20Up.m4a', count: 0, isPlaying: false },
					{ id: 3, soundName: 'Bad Boy', soundURL: 'https://dl.dropboxusercontent.com/s/fnp5rk5wg6e13mi/Bad%20Boy.m4a', count: 0, isPlaying: false },
					{ id: 4, soundName: 'Buckwild', soundURL: 'https://dl.dropboxusercontent.com/s/t3auwv5p5dx70tl/Buckwild.m4a', count: 0, isPlaying: false },
					{ id: 5, soundName: 'Good Boy', soundURL: 'https://dl.dropboxusercontent.com/s/ubp2d6jcw4nlnh6/Good%20Boy.m4a', count: 0, isPlaying: false },
					{ id: 6, soundName: 'Always Said', soundURL: 'https://dl.dropboxusercontent.com/s/8om99gxk3qoj98y/Always%20Said%20That.m4a', count: 0, isPlaying: false },
					{ id: 7, soundName: 'Its ya boi', soundURL: 'https://dl.dropboxusercontent.com/s/ull84u2sw5zdhwx/its%20ya%20boi.m4a', count: 0, isPlaying: false },
					{ id: 8, soundName: 'Large Sharkie Boiz', soundURL: 'https://dl.dropboxusercontent.com/s/r5mwb9h7q0a0eh6/Large%20Sharkie%20boiz.m4a', count: 0, isPlaying: false },
					{ id: 9, soundName: 'Fuck me up', soundURL: 'https://dl.dropboxusercontent.com/s/27s9bv4s6w6dd64/Fuck%20me%20up.m4a', count: 0, isPlaying: false },
					{ id: 10, soundName: 'Grab That Moon', soundURL: 'https://dl.dropboxusercontent.com/s/t0ijlpybr7vycnd/Grab%20That%20Moon.m4a', count: 0, isPlaying: false },
					{ id: 11, soundName: 'Live your best life', soundURL: 'https://dl.dropboxusercontent.com/s/ajnfmv31f3xes88/Live%20your%20best%20life.m4a', count: 0, isPlaying: false },
					{ id: 12, soundName: 'I got you boo', soundURL: 'https://dl.dropboxusercontent.com/s/5ruja5miaguq4ix/I%20got%20you%20boo.m4a', count: 0, isPlaying: false },
					{ id: 13, soundName: 'Its ya boi', soundURL: 'https://dl.dropboxusercontent.com/s/8tmikmnhr0k59bx/win-an-award.m4a', count: 0, isPlaying: false },
					{ id: 14, soundName: 'Smoke Test', soundURL: 'https://dl.dropboxusercontent.com/s/uzpwdses6es4j9w/Smoke%20Test%20Everyday.m4a', count: 0, isPlaying: false },
					{ id: 15, soundName: 'The Good Hour', soundURL: 'https://dl.dropboxusercontent.com/s/hid376pjelaklsm/The%20Good%20Hour.m4a', count: 0, isPlaying: false },
					{ id: 16, soundName: 'Design Daddy', soundURL: 'https://dl.dropboxusercontent.com/s/8l2qjg6jwh41vk5/Design%20Daddy.m4a', count: 0, isPlaying: false },
					{ id: 16, soundName: 'Pride', soundURL: 'https://dl.dropboxusercontent.com/s/olflrlhi1bayynm/Pride.m4a', count: 0, isPlaying: false },
					{ id: 17, soundName: 'Jade Dimitri', soundURL: 'https://dl.dropboxusercontent.com/s/p1ayj26cj6627ml/Jade%20Dimitri.m4a', count: 0, isPlaying: false }
				]
			}
		}
			render() {
				return (
					<div>
						<div className="background-img"></div>
						<h1>Design Daddy Soundboard</h1>
						<Board sounds={this.state.sounds} audio={this.state.audio} />

					</div>
				);
			}
	};
	
	ReactDOM.render(<App />, document.getElementById('root'));