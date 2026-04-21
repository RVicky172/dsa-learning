import type { Topic } from '../../../types/topic';
import DataStructureVisualizer, { type VisualizerProps } from '../../DataStructureVisualizer';
import styles from '../TopicDetail.module.css';

interface VisualizationsTabProps {
    topic: Topic;
}

const getVisualizationType = (topicId: string): VisualizerProps['type'] => {
    const visualizationMap: Record<string, VisualizerProps['type']> = {
        'arrays': 'array',
        'linked-lists': 'linked-list',
        'hash-tables': 'hash-table',
        'trees': 'binary-tree',
        'stacks-queues': 'stack',
        'heaps': 'heap',
        'graphs': 'graph',
    };
    return visualizationMap[topicId] ?? 'array';
};

const VisualizationsTab = ({ topic }: VisualizationsTabProps) => {
    const vizType = getVisualizationType(topic.id);

    return (
        <div className={styles.visualizationsContainer}>
            <h2 className={styles.visualizationsTitle}>Interactive Visualizations</h2>
            <p className={styles.visualizationsDescription}>
                Watch how {topic.title} works with animated, interactive visualizations. These help you understand the data structure's behavior in real-time.
            </p>

            <div className={styles.visualizationSection}>
                <h2 className={styles.visualizationSectionTitle}>
                    Data Structure Visualization
                </h2>
                {topic.visualizations && topic.visualizations.length > 0 ? (
                    <div className={styles.visualizationsList}>
                        {topic.visualizations.map((viz, idx) => (
                            <div key={idx}>
                                <DataStructureVisualizer {...viz} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <DataStructureVisualizer
                        type={vizType}
                        title={`${topic.title} Visualization`}
                        description="Watch the animation to understand how this data structure works"
                    />
                )}
            </div>

            <div className={styles.visualizationInfoBox}>
                <h3 className={styles.visualizationInfoTitle}>About the Visualization</h3>
                <ul className={styles.visualizationInfoList}>
                    <li>✨ <strong>Animated Elements:</strong> Watch how elements are added, removed, or rearranged</li>
                    <li>🎯 <strong>Highlighted Focus:</strong> Elements are highlighted as they are being processed</li>
                    <li>⏱️ <strong>Real-time Flow:</strong> The animation loops to show continuous operation</li>
                    <li>💡 <strong>Educational:</strong> Helps visualize abstract concepts in a concrete way</li>
                </ul>
            </div>
        </div>
    );
};

export default VisualizationsTab;
