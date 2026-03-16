(function() {
    var inputEl = document.getElementById('jtreeInput');
    var viewerEl = document.getElementById('jtreeViewer');
    var statusEl = document.getElementById('jtreeStatus');
    var viewBtn = document.getElementById('jtreeView');
    var clearBtn = document.getElementById('jtreeClear');

    function setStatus(msg, type) {
        if (!statusEl) return;
        statusEl.textContent = msg;
        statusEl.className = 'code-status ' + (type || '');
    }

    function buildTree(value, key, parent) {
        var node = document.createElement('div');
        node.className = 'jtree-node';

        var line = document.createElement('span');

        if (key !== undefined) {
            var keyEl = document.createElement('span');
            keyEl.className = 'jtree-key';
            keyEl.textContent = '"' + key + '"';
            line.appendChild(keyEl);
            var colon = document.createTextNode(': ');
            line.appendChild(colon);
        }

        if (value === null) {
            var nullEl = document.createElement('span');
            nullEl.className = 'jtree-null';
            nullEl.textContent = 'null';
            line.appendChild(nullEl);
            node.appendChild(line);
        } else if (typeof value === 'boolean') {
            var boolEl = document.createElement('span');
            boolEl.className = 'jtree-boolean';
            boolEl.textContent = value.toString();
            line.appendChild(boolEl);
            node.appendChild(line);
        } else if (typeof value === 'number') {
            var numEl = document.createElement('span');
            numEl.className = 'jtree-number';
            numEl.textContent = value.toString();
            line.appendChild(numEl);
            node.appendChild(line);
        } else if (typeof value === 'string') {
            var strEl = document.createElement('span');
            strEl.className = 'jtree-string';
            strEl.textContent = '"' + value.replace(/"/g, '\\"').substring(0, 200) + (value.length > 200 ? '...' : '') + '"';
            line.appendChild(strEl);
            node.appendChild(line);
        } else if (Array.isArray(value)) {
            var toggle = document.createElement('span');
            toggle.className = 'jtree-toggle';
            toggle.textContent = '-';
            line.insertBefore(toggle, line.firstChild);
            var typeEl = document.createElement('span');
            typeEl.className = 'jtree-type';
            typeEl.textContent = ' Array[' + value.length + ']';
            line.appendChild(typeEl);
            node.appendChild(line);
            var children = document.createElement('div');
            children.className = 'jtree-children';
            value.forEach(function(item, idx) { children.appendChild(buildTree(item, idx, node)); });
            toggle.addEventListener('click', function() {
                var collapsed = children.classList.toggle('collapsed');
                toggle.textContent = collapsed ? '+' : '-';
            });
            node.appendChild(children);
        } else if (typeof value === 'object') {
            var keys = Object.keys(value);
            var toggle2 = document.createElement('span');
            toggle2.className = 'jtree-toggle';
            toggle2.textContent = '-';
            line.insertBefore(toggle2, line.firstChild);
            var typeEl2 = document.createElement('span');
            typeEl2.className = 'jtree-type';
            typeEl2.textContent = ' Object{' + keys.length + '}';
            line.appendChild(typeEl2);
            node.appendChild(line);
            var children2 = document.createElement('div');
            children2.className = 'jtree-children';
            keys.forEach(function(k) { children2.appendChild(buildTree(value[k], k, node)); });
            toggle2.addEventListener('click', function() {
                var collapsed = children2.classList.toggle('collapsed');
                toggle2.textContent = collapsed ? '+' : '-';
            });
            node.appendChild(children2);
        }

        return node;
    }

    function view() {
        if (!inputEl || !viewerEl) return;
        var text = inputEl.value.trim();
        if (!text) { viewerEl.classList.remove('visible'); return; }
        try {
            var parsed = JSON.parse(text);
            viewerEl.innerHTML = '';
            viewerEl.appendChild(buildTree(parsed, undefined, viewerEl));
            viewerEl.classList.add('visible');
            setStatus('', '');
        } catch (e) {
            viewerEl.classList.remove('visible');
            setStatus('Invalid JSON: ' + e.message, 'error');
        }
    }

    if (viewBtn) viewBtn.addEventListener('click', view);

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            inputEl.value = '';
            viewerEl.innerHTML = '';
            viewerEl.classList.remove('visible');
            setStatus('', '');
        });
    }
})();
