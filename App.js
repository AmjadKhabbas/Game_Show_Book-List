import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [games, setGames] = useState([]);
  const [books, setBooks] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [newItem, setNewItem] = useState({ type: 'game', name: '', url: '', dimensions: 'width=800,height=600' });
  const [editingItem, setEditingItem] = useState(null);

  // Load initial data from localStorage
  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('games')) || [];
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    const savedShows = JSON.parse(localStorage.getItem('tvShows')) || [];
    
    setGames(savedGames);
    setBooks(savedBooks);
    setTvShows(savedShows);
  }, []);

  const backgroundStyle = {
    background: '#001f3f',
    fontFamily: "'Roboto', sans-serif"
  };

  const handleGameClick = (game) => {
    window.open(game.url, game.name, game.dimensions);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.url) return;
    
    switch(newItem.type) {
      case 'game':
        const updatedGames = [...games, {...newItem, dimensions: 'width=800,height=600'}];
        setGames(updatedGames);
        localStorage.setItem('games', JSON.stringify(updatedGames));
        break;
      case 'book':
        const updatedBooks = [...books, newItem];
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        break;
      case 'show':
        const updatedShows = [...tvShows, newItem];
        setTvShows(updatedShows);
        localStorage.setItem('tvShows', JSON.stringify(updatedShows));
        break;
      default:
        return;
    }
    
    setNewItem({ type: 'game', name: '', url: '', dimensions: 'width=800,height=600' });
  };

  const handleEditItem = (type, index, updatedItem) => {
    switch(type) {
      case 'game':
        const updatedGames = [...games];
        updatedGames[index] = {...updatedGames[index], ...updatedItem};
        setGames(updatedGames);
        localStorage.setItem('games', JSON.stringify(updatedGames));
        break;
      case 'book':
        const updatedBooks = [...books];
        updatedBooks[index] = {...updatedBooks[index], ...updatedItem};
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        break;
      case 'show':
        const updatedShows = [...tvShows];
        updatedShows[index] = {...updatedShows[index], ...updatedItem};
        setTvShows(updatedShows);
        localStorage.setItem('tvShows', JSON.stringify(updatedShows));
        break;
      default:
        return;
    }
    setEditingItem(null);
  };

  const handleRemoveItem = (type, index) => {
    switch(type) {
      case 'game':
        const updatedGames = games.filter((_, i) => i !== index);
        setGames(updatedGames);
        localStorage.setItem('games', JSON.stringify(updatedGames));
        break;
      case 'book':
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        break;
      case 'show':
        const updatedShows = tvShows.filter((_, i) => i !== index);
        setTvShows(updatedShows);
        localStorage.setItem('tvShows', JSON.stringify(updatedShows));
        break;
      default:
        return;
    }
  };

  const renderErrorMessage = (item) => {
    if (!item.name) return <div style={{color: '#ff4444', fontSize: '0.8rem'}}>Missing title</div>;
    if (!item.url) return <div style={{color: '#ff4444', fontSize: '0.8rem'}}>Missing URL</div>;
    return null;
  };

  const renderEditForm = (item, type, index) => {
    if (!editingItem || editingItem.type !== type || editingItem.index !== index) return null;
    
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleEditItem(type, index, {name: editingItem.name, url: editingItem.url});
      }} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '0.5rem'
      }}>
        <input
          type="text"
          value={editingItem.name}
          onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
          style={{ padding: '0.25rem' }}
        />
        <input
          type="url"
          value={editingItem.url}
          onChange={(e) => setEditingItem({...editingItem, url: e.target.value})}
          style={{ padding: '0.25rem' }}
        />
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button type="submit" style={{
            padding: '0.25rem',
            backgroundColor: '#004f9f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>Save</button>
          <button onClick={() => setEditingItem(null)} style={{
            padding: '0.25rem',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>Cancel</button>
        </div>
      </form>
    );
  };

  return (
    <div className="App">
      <header className="App-header" style={{ ...backgroundStyle, color: 'white' }}>
        <h1 style={{ 
          fontFamily: "'Montserrat', sans-serif", 
          marginBottom: '0.5rem',
          marginTop: '0.5rem'
        }}>
          Track Your Entertainment
        </h1>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '1rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            width: '100%',
            fontFamily: "'Roboto', sans-serif",
            marginBottom: '2rem'
          }}>
            <div>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif" }}>Online Games</h2>
              {games.map((game, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    className="App-link"
                    onClick={() => handleGameClick(game)}
                    style={{
                      marginBottom: '0.25rem',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: 'inherit',
                      display: 'block',
                      fontFamily: "'Roboto', sans-serif"
                    }}
                  >
                    Play {game.name}
                  </button>
                  <button
                    onClick={() => setEditingItem({type: 'game', index, ...game})}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleRemoveItem('game', index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4444',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    ×
                  </button>
                  {renderErrorMessage(game)}
                  {renderEditForm(game, 'game', index)}
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif" }}>Books</h2>
              {books.map((book, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    marginBottom: '0.25rem',
                    color: 'white',
                    display: 'block',
                    fontFamily: "'Roboto', sans-serif"
                  }}>
                    {book.name}
                  </div>
                  <button
                    onClick={() => setEditingItem({type: 'book', index, ...book})}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleRemoveItem('book', index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4444',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    ×
                  </button>
                  {renderErrorMessage(book)}
                  {renderEditForm(book, 'book', index)}
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif" }}>TV Shows</h2>
              {tvShows.map((show, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    marginBottom: '0.25rem',
                    color: 'white',
                    display: 'block',
                    fontFamily: "'Roboto', sans-serif"
                  }}>
                    {show.name}
                  </div>
                  <button
                    onClick={() => setEditingItem({type: 'show', index, ...show})}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleRemoveItem('show', index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff4444',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    ×
                  </button>
                  {renderErrorMessage({...show, type: 'show'})}
                  {renderEditForm(show, 'show', index)}
                </div>
              ))}
            </div>
          </div>

          <h1 style={{ fontFamily: "'Montserrat', sans-serif", marginBottom: '2rem' }}>Add Something to the list</h1>
          <form onSubmit={handleAddItem} style={{
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '300px'
          }}>
            <select 
              value={newItem.type}
              onChange={(e) => setNewItem({...newItem, type: e.target.value})}
              style={{ padding: '0.5rem' }}
            >
              <option value="game">Game</option>
              <option value="book">Book</option>
              <option value="show">TV Show</option>
            </select>
            <input
              type="text"
              placeholder="Title"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <input
              type="url"
              placeholder="URL"
              value={newItem.url}
              onChange={(e) => setNewItem({...newItem, url: e.target.value})}
              style={{ padding: '0.5rem' }}
            />
            <button type="submit" style={{
              padding: '0.5rem',
              backgroundColor: '#004f9f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Add {newItem.type.charAt(0).toUpperCase() + newItem.type.slice(1)}
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
