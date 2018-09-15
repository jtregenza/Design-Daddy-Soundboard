// Hit the gear icon to the left of JS in the header to open JavaScript settings

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
			return (
				<div className='sound-card'
					onClick={() => this.props.playSound(this.props.sound.id)}>
					<div class="sound-content">
						<h3>{this.props.sound.soundName}</h3>
						<div class="sound-actions">
							<div className="image-container">
								<i className='material-icons' aria-hidden="true">{speakerStyle}</i>
							</div>
							<div className="count">{this.props.sound.count}</div>
						</div>
						<div class="record-container">
							<img class={recordAni} src="/img/record-icon.svg"/>
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
					{ id: 1, soundName: 'How you livin', soundURL: 'https://dl.dropboxusercontent.com/s/bao523r1ixxj32b/Recording.m4a', count: 0, isPlaying: false }, 
					{ id: 2, soundName: 'Fuck it up', soundURL: 'https://dl.dropboxusercontent.com/s/bciko68hn6vxfi5/munchdew.m4a', count: 0, isPlaying: false },
					{ id: 3, soundName: 'Bad Boy', soundURL: 'https://dl.dropboxusercontent.com/s/uah7h53h85iewgz/uh-oops.m4a', count: 0, isPlaying: false },
					{ id: 4, soundName: 'Buckwild', soundURL: 'https://dl.dropboxusercontent.com/s/uxh2dg6u5feqwcc/hufflepuff.m4a', count: 0, isPlaying: false },
					{ id: 5, soundName: 'Good Boy', soundURL: 'https://dl.dropboxusercontent.com/s/323rhnwp9bnglmj/struck-by-lightning.m4a', count: 0, isPlaying: false },
					{ id: 6, soundName: 'Always Said', soundURL: 'https://dl.dropboxusercontent.com/s/mh53hc4v5vfil2r/primal-noises.m4a', count: 0, isPlaying: false },
					{ id: 7, soundName: 'Laugh 1', soundURL: 'https://dl.dropboxusercontent.com/s/44wlc2ifqf20qzt/family.m4a', count: 0, isPlaying: false },
					{ id: 8, soundName: 'Laugh 2', soundURL: 'https://dl.dropboxusercontent.com/s/s70hruqm15jd7qc/lazer.m4a', count: 0, isPlaying: false },
					{ id: 9, soundName: 'Star Wars', soundURL: 'https://dl.dropboxusercontent.com/s/tpdoeh03q26soil/stay-as-little-as-possible.m4a', count: 0, isPlaying: false },
					{ id: 10, soundName: 'Grab That Moon', soundURL: 'https://dl.dropboxusercontent.com/s/ep463jwi2y99gfw/terrible.m4a', count: 0, isPlaying: false },
					{ id: 11, soundName: 'Live your best life', soundURL: 'https://dl.dropboxusercontent.com/s/8tmikmnhr0k59bx/win-an-award.m4a', count: 0, isPlaying: false },
					{ id: 12, soundName: 'I got you boo', soundURL: 'https://dl.dropboxusercontent.com/s/8tmikmnhr0k59bx/win-an-award.m4a', count: 0, isPlaying: false },
					{ id: 13, soundName: 'Its ya boi', soundURL: 'https://dl.dropboxusercontent.com/s/8tmikmnhr0k59bx/win-an-award.m4a', count: 0, isPlaying: false },
					{ id: 13, soundName: 'Smoke Test', soundURL: 'https://dl.dropboxusercontent.com/s/8tmikmnhr0k59bx/win-an-award.m4a', count: 0, isPlaying: false },
					{ id: 14, soundName: 'The Good Hour', soundURL: 'https://dl.dropboxusercontent.com/s/8tmikmnhr0k59bx/win-an-award.m4a', count: 0, isPlaying: false }
				]
			}
		}
			render() {
				return (
					<div>
						<div class="background-img"></div>
						<h1>Design Daddy Soundboard</h1>
						<Board sounds={this.state.sounds} audio={this.state.audio} />
						{/* <p>Special thanks to <a href="https://twitter.com/manifoldkaizen">Stephen Fox</a> for the help with toggling icons and <a href='https://twitter.com/gwmccull'>Garrett McCullough</a> helping me understand event listeners and memory leak!</p> */}
					</div>
				);
			}
	};
	
	ReactDOM.render(<App />, document.getElementById('root'));