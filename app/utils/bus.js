const listeners = {};

export function subscribe(event, cb){
  if(!listeners[event]) listeners[event] = [];
  listeners[event].push(cb);
  return () => {
    listeners[event] = listeners[event].filter(f => f !== cb);
  }
}

export function publish(event, data){
  const fns = listeners[event] || [];
  fns.forEach(fn => {
    try{ fn(data); }catch(e){}
  })
}

export default { subscribe, publish };
